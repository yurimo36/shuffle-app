import React, { useState } from 'react';
import { Container, Form, TextArea, Button, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function Home() {
  const [name, setName] = useState([]);
  const [group, setGroup] = useState([]);
  const [result, setResult] = useState([]);
  const color = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown"];

  const getName = () => {
    const data = document.form.name.value.split('\n');
    setName(data.filter((item) => {
      return item != "";
    }));
  };

  const getGroup = () => {
    const data = document.form.group.value.split('\n');
    setGroup(data.filter((item) => {
      return item != "";
    }));
  };

  const shuffle = () => {
    let shuffledName = name.slice();
    let data = [];
    // シャッフル
    for(let i = shuffledName.length-1; i>0; i--){
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = shuffledName[i];
      shuffledName[i] = shuffledName[r];
      shuffledName[r] = tmp;
    };
    for (let i=0; i<group.length; i++){
      data.push(shuffledName.splice(0, Math.floor(name.length/group.length)+(i<name.length%group.length)));
    };
    setResult(data);
    window.scroll({
      top: document.getElementById("result").getBoundingClientRect().top + window.pageYOffset + 20,
      behavior: "smooth"
    });
  };

  return (
    <Container>
      <p style={{margin: "30px", textAlign: "center", fontSize: "3em"}}><b>Shuffle-app</b></p>
      <Form name="form"　style={{display: "flex", justifyContent: "space-between", textAlign: "center"}}>
        <div style={{width: "45%"}}>
          <p>名前</p>
          <TextArea name="name" placeholder='改行区切りで入力してください' rows="10"/>
          <Button color="teal" content="Apply" style={{marginTop: "10px"}} onClick={() => getName()}/>
        </div>
        <div style={{width: "45%"}}>
          <p>グループ名</p>
          <TextArea name="group" placeholder='改行区切りで入力してください' rows="10"/>
          <Button color="teal" content="Apply" style={{marginTop: "10px"}} onClick={() => getGroup()}/>
        </div>
      </Form>
      <div style={{display: "flex"}}>
        <ul style={{width: "55%"}}>
          {name.length > 0 && name.map((item, index) =>
            <li key={index}>{item}</li>
          )}
        </ul>
        <ul style={{width: "45%"}}>
          {group.length > 0 && group.map((item, index) =>
            <li key={index}>{item}</li>
          )}
        </ul>
      </div>
      <div style={{textAlign: "center", marginTop: "30px"}}>
        <Button color="blue" size="massive" content="Shuffle!!" disabled={!(name.length > 0 && group.length > 0)} onClick={() => shuffle()}/>
      </div>
      <div id="result" style={{paddingTop: "50px", paddingBottom: "30px"}}>
        {result.length > 0 && result.map((item, index) =>
          <Segment color={color[index%color.length]} key={index}>
            <b>{group[index]}</b>
            <p>{item.join(',　')}</p>
          </Segment>
        )}
      </div>
      <footer style={{textAlign: "center", paddingBottom: "10px"}}>
        <p>&copy; 2021 Yuriko Takahashi</p>
      </footer>
    </Container>
  );
};
