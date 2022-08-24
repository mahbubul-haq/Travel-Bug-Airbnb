import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

const EditCategory = (props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("0");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("0");
  const [subCategories, setSubCategories] = useState([]);

  const getSubCategories = async () => {
    if (selectedCategoryId !== "0") {
      const response = await fetch(
        `http://localhost:5000/experience/subcategories`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryId: selectedCategoryId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setSubCategories(data);
    } else {
      setSubCategories([]);
    }
  };

  useEffect(() => {
    console.log(props.categoryId());
    setSelectedCategoryId(props.categoryId());
    setSelectedSubCategoryId(props.experience().subCategories[0]._id);
    getSubCategories();
  }, []);

  useEffect(() => {
    props.setExperience({ categories: [selectedCategoryId] });
    getSubCategories();
  } , [selectedCategoryId]);

  useEffect(() => {
    props.setExperience({ subCategories: [selectedSubCategoryId] });
  }, [selectedSubCategoryId])

  const getSubCatagory = () => {
    const element = document.getElementById("select-sub-category");
    setSelectedSubCategoryId(element.options[element.selectedIndex].value);

  };

  const getCatagory = () => {
    const element = document.getElementById("select-category");
    const category = element.options[element.selectedIndex].value;
    setSelectedCategoryId(category);
    setSelectedSubCategoryId("0");
    
    console.log(category);
  };

  return (
    <>
      
      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
        Select a category
      </p>
      <Form.Select
        id="select-category"
        aria-label="select-category"
        value={selectedCategoryId}
        onChange={() => getCatagory()}
      >
        <option value="0">Select a category</option>
        {props.categories().map(({ categoryName, _id }) => {
          return (
            <option key={_id} value={_id}>
              {categoryName}
            </option>
          );
        })}
      </Form.Select>

      <p style={{ marginBottom: "5px", marginTop: "20px", fontWeight: "bold" }}>
        Select a Subcategory
      </p>

      <Form.Select
        id="select-sub-category"
        aria-label="select-sub-category"
        value={selectedSubCategoryId}
        onChange={() => getSubCatagory()}
        disabled={selectedCategoryId === "0"}
      >
        <option value="0">Select a Subcategory</option>
        {subCategories.map(({ subCategoryName, _id }) => {
          console.log("wow", selectedSubCategoryId, _id);
          return (
            <option key={_id} value={_id}>
              {subCategoryName}
            </option>
          );
        })}
      </Form.Select>
    </>
  );
};

export default EditCategory;
