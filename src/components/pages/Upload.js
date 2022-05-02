import React, { useRef, useEffect, useState } from "react";
import { firebase_db, firebaseStorage } from "../../service/firebaseConfig";
import * as firebaseAuth from "../../service/firebaseAuth";
import styled from "styled-components";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;
const FileInputButton = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 200px;
  padding: 10px;
  &: active {
    opacity: 0.5;
  }
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  position: absolute;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Upload() {
  const fileInputRef = useRef();
  const previewRef = useRef();
  const postContentRef = useRef();
  const [file, setFile] = useState({});
  const [uid, setUid] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const onFileInputBtnClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const reader = new FileReader();
    const newfile = e.target.files[0];
    reader.onload = (e) => {
      previewRef.current.src = e.target.result;
    };
    reader.readAsDataURL(newfile);
    setFile(newfile);
  };

  const onSubmitBtnClick = async (e) => {
    setloading(true);
    const storage = firebaseStorage.ref().child(`images`);
    const response = await storage.put(file);
    const url = await response.ref.getDownloadURL();
    const newPostKey = firebase_db.ref().child("posts").push().key;
    const postData = {
      postContent: postContentRef.current.value,
      postKey: newPostKey,
      postPic: url,
      starCount: 0,
      uid: uid,
      userName: "정승민",
    };
    const updates = {};
    updates["/posts/" + newPostKey] = postData;
    await firebase_db.ref().update(updates);
    navigate("/");
  };

  useEffect(() => {
    firebaseAuth.onAuthChanged((user) => {
      setUid(user.uid);
    });
  }, [firebaseAuth]);

  return (
    <>
      <UploadContainer>
        <FileInputButton onClick={onFileInputBtnClick}>
          사진넣기
          <img ref={previewRef} style={{ height: "150px" }}></img>
        </FileInputButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <textarea
          ref={postContentRef}
          placeholder="내용"
          name="post_content"
          style={{ width: "300px", height: "150px" }}
        />
        <button onClick={onSubmitBtnClick}>글 올리기</button>
      </UploadContainer>
      {loading && (
        <LoadingContainer>
          <ReactLoading
            type="spin"
            color="white"
            width="200px"
            height="200px"
          />
        </LoadingContainer>
      )}
    </>
  );
}

export default Upload;
