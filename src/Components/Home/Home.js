import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [baseString, setBaseString] = useState(["", ""]);
    const [result, setResult] = useState(["", 0]);

    const getPercentage = (event) => {
        event.preventDefault();

        const encodedParams = new URLSearchParams();
        encodedParams.append("image1Base64", baseString[0]);
        encodedParams.append("image2Base64", baseString[1]);

        const options = {
            method: "POST",
            url: "https://face-verification2.p.rapidapi.com/faceverification",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Host": "face-verification2.p.rapidapi.com",
                "X-RapidAPI-Key": "dfe42466d2msh2934a16d76585f5p150f3bjsnbff448a9d357",
            },
            data: encodedParams,
        };

        axios
            .request(options)
            .then(function (response) {
                let temp = [...result];
                temp[0] = response.data.data.resultMessage;
                temp[1] = response.data.data.similarPercent;
                setResult(temp);
                console.log(temp);
                console.log(response.data.data.resultMessage);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const convert = (event, p) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        let temp = [...baseString];
        reader.onloadend = function () {
            temp[p] = reader.result;
            setBaseString(temp);
            // console.log(temp[p]);
        };
    };

    return (
        <div>
            <form onSubmit={(event) => getPercentage(event)} style={{ display: "block" }}>
                <div className="display-box">
                    <div>
                        <div className="form-group">
                            Image 1 :<br />
                            <input type="file" accept="Image/*" onChange={(event) => convert(event, 0)} />
                        </div>
                        <br />
                        Your uploaded image 1
                        <br />
                        {baseString[0] !== "" ? <img src={baseString[0]} alt="img1" /> : <div className="imageDisplay"></div>}
                    </div>
                    <div>
                        <div className="form-group">
                            Image 2 :<br />
                            <input type="file" accept="Image/*" onChange={(event) => convert(event, 1)} />
                        </div>
                        <br />
                        Your uploaded image 2
                        <br />
                        {baseString[1] !== "" ? <img src={baseString[1]} alt="img2" /> : <div className="imageDisplay"></div>}
                    </div>
                </div>
                <div className="form-group btn-container">
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                {result[0] !== "" ? (
                    <div>
                        <p>Result: {result[0]}</p>
                        <p>Percentage Similarity: {result[1]}</p>
                    </div>
                ) : (
                    "Look here for results"
                )}
            </div>
        </div>
    );
};

export default Home;
