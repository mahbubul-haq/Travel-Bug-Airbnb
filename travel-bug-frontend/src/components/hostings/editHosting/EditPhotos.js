import axios from "axios";
import React, { useEffect } from "react";

import ImageIcon from "../../../images/imageIcon.png";
import "../cssFiles/EditPhotos.css";
const imageUrl = "http://localhost:5000/host/experience/getimage/";

//F:\MEGA\Level4Term1\CSE408\clone2\CSE-408-Project-Travel-Bug\travel-bug-frontend\src\images

const EditPhotos = (props) => {
  useEffect(() => {
    changeStyle();
  }, []);

  const handleImageChange = async (event) => {
    event.preventDefault();

    changeStyle();
    let formData = new FormData();
    //formData.append("image", files[0], files[0].name);
    // formData.append('title', files[0].name);

    const files = document.getElementById("uploadPhoto7");
    formData.append("image", files.files[0]);

    console.log(files.files[0]);

    //console.log(files[0].name);
    // console.log(files[0]);
    // console.log(files[0].path);
    //console.log(formData.get("file"));

    // const response = await fetch("http://localhost:5000/host/experience/upload", {
    //         method: 'POST',
    //         headers: { "Content-Type": "multipart/form-data" },
    //         body: formData
    //     });

    //     const json = await response.json()
    //     console.log(json);

    axios
      .post("http://localhost:5000/host/experience/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        //props.setSelectedImages("uploads/" + res);
        console.log("data ", res);
        props.setExperience({
          hostingPhotos: [...props.experience().hostingPhotos, imageUrl + res],
        });
      })
      .catch((err) => console.log("error here axios", err));

    // event.preventDefault();
    //let url = baseUrl + "users/photo-upload/";
    /*axios
      .post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) return res.data;
        else {
          let err = new Error("Error " + res.status + ": " + res.statusText);
          err.res = res;
          throw err;
        }
        // console.log(res.data);
        // console.log(res);
      })
      .then((response) => {
        // console.log(response);
        let currentImages = props.images;

        currentImages.push({
          src: "http://127.0.0.1:8000" + response.uploaded_photo.image,
        });
        props.selectImage(currentImages);
        // console.log(state);
      })
      .catch((err) => alert(err));*/

    //props.setSelectedImages(imagePath + files[0].name);
    // var element = document.getElementById("imgIconContainer7");
    //element.style.display = "flex";
  };

  const changeStyle = () => {
    var element = document.getElementById("dummy7");
    console.log(props.experience().hostingPhotos.length);
    if (props.experience().hostingPhotos.length > 0) {
      var element1 = document.getElementById("imgIconContainer7");
      if (element1 != null) element1.style.display = "flex";
      if (element != null) element.style.height = "0px";
    } else {
      if (element != null) element.style.height = "150px";
      var element1 = document.getElementById("imgIconContainer7");
      if (element1 != null) element1.style.display = "none";
    }
  };

  const deleteImage = (src) => {
    console.log("here ", src);
    props.setExperience({
      hostingPhotos: props
        .experience()
        .hostingPhotos.filter((image) => image !== src),
    });
    changeStyle();
  };

  return (
      <div id="addPhoto7-edit">
        <div id="dummy7"></div>
        <div id="upper7">
          <div id="dragPhoto7">Change photos</div>

          <div id="smallText7">At least 5 photos</div>
          <label htmlFor="uploadPhoto7" id="labelUploadPhoto7" className="btn">
            Upload Image
          </label>

          <input
            style={{ visibility: "hidden", display: "none" }}
            type="file"
            id="uploadPhoto7"
            accept="image/png, image/jpeg"
            onChange={(event) => {
              event.preventDefault();
              handleImageChange(event);
              changeStyle();
            }}
          />
        </div>

        <div id="imageContainer7">
          {props.experience().hostingPhotos.map((image, index) => {
            changeStyle();

            return (
              <div id="imageWrap7" key={index}>
                <span
                  id="close7"
                  onClick={() => {
                    //console.log("d: " + image.src);
                    //deleteImage(image.src);
                    deleteImage(image);
                    changeStyle();
                  }}
                >
                  &times;
                </span>
                <img id="img7" src={image} alt="new" />
              </div>
            );
          })}
          <label htmlFor="uploadPhoto7" id="imgIconContainer7">
            <img id="imageIcon7" src={ImageIcon} alt="Upload Icon" />
          </label>
        </div>
      </div>
  );
};

export default EditPhotos;
