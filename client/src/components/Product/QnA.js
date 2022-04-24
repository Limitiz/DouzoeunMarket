import React, { useEffect, useState } from "react";
import axios from "axios";

function QnA({ id }) {
  const [qnacontent, setQnacontent] = useState("");
  const [contentlist, setContentlist] = useState([]);

  const postQna = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/product/detail/qna/${id}`,
        { idx: id, qnacontent: qnacontent }
      );
      setQnacontent(res.data);
      setContentlist([...contentlist, res.data]);
      console.log(contentlist);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getQna = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/detail/qna/${id}`
        );
        setContentlist(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getQna();
  }, [id]);

  return (
    <div>
      <div className="qnaform">
        <input
          type="text"
          placeholder="상품 문의 입력..."
          className="qnainput"
          onChange={(e) => setQnacontent(e.target.value)}
        ></input>
        &nbsp;&nbsp;
        <button onClick={postQna} className="qnabutton">
          등록
        </button>
      </div>
      <hr />
      <div>
        {contentlist &&
          contentlist.map((item, id) => {
            return (
              <div key={id}>
                {item.content}
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default QnA;
