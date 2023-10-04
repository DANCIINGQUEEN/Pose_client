import React, {useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


import {Container, ThemeColor, Button, Loading} from "../UI/UIPackage";
import {functions} from "../../utils/Functions";
import {UPLOAD_USER_POST, MATE} from "../../services/api";

const Label = styled.label`
  display: block;
  width: 340px;
  height: 340px;
  border: none;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};
  cursor: pointer;
`
const ImgInput = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
  font-size: 180px;
  margin-bottom: 100px;
`
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${ThemeColor.primaryColor};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 30px;
`
const Textarea = styled.textarea`
  width: 320px;
  min-height: 100px;
  height: auto;
  resize: none;
  border: none;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 10px;
  font-family: 'Gothic', sans-serif;

  &::placeholder {
    color: #999;
  }
`
function PostUpload(props) {
    const [file, setFile] = useState();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const email=useSelector(state=>state.email)
    const navigate = useNavigate();
    const strippedEmail = email.substring(0, email.length - 4);

    const handleRemove = () => {
        setFile(null);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }
    const handleSubmit = async () => {
        setIsLoading(true)
        let headers=functions.getJWT()
        headers={...headers, 'Content-Type': 'multipart/form-data'}
        const formData = new FormData();
        formData.append('content', content);
        formData.append('email', strippedEmail);
        formData.append('file', file);
        // console.log(formData, file, content)
        try {
            const res = await axios.post(UPLOAD_USER_POST, formData, {headers: headers})
            console.log(res)
        } catch (error) {
            console.log(error)
        }finally {
            setIsLoading(false)
            navigate(MATE)
        }
    }
    return (
        <Container>
            <h1>게시물 업로드</h1>

            <div style={{position: 'relative'}}>
                <Label htmlFor="fileInput">
                    {file ? (
                        <>
                            <ImgInput src={URL.createObjectURL(file)} alt="Uploaded"/>
                            <DeleteButton onClick={handleRemove}>
                                ⨉
                            </DeleteButton>
                        </>
                    ) : (
                        <Span>
                            +
                        </Span>
                    )}
                </Label>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={(e)=>setFile(e.target.files[0])}
                />
            </div>
            <br/>
            <Textarea placeholder="내용을 입력하세요" onChange={handleContentChange}/>
            <br/>
            <Button style={{width: '100px'}} onClick={handleSubmit} disabled={!file}>
                {isLoading ? <Loading/> : '업로드'}
            </Button>
        </Container>
    );
}

export default PostUpload;
