import React, { useEffect, useState } from "react";

import "../cssFiles/HostingPage1Base.css";
import "../cssFiles/HostingPage2.css";

const HostingPage2 = (props) => {
  const [subCategories, setSubCategories] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    console.log("here", props.selectedCategory());
    console.log("here", props.selectedSubCategory());
    fetch("http://localhost:5000/experience/subcategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId: props.selectedCategory().id,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res;
        else {
          throw new Error("Something went wrong");
        }
      })
      .then((res) => {
        //console.log(res.json());
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const cats = data.map((cat) => {
          return {
            subCategoryName: cat.subCategoryName,
            id: cat._id,
            categoryName: cat.category.categoryName,
          };
        });
        console.log(cats);

        setSubCategories(cats);
        if (props.selectedSubCategory()) {
          changeStyle(props.selectedSubCategory().id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    subCategories.map(({ subCategoryName, id }) => {
      console.log("cat: " + subCategoryName);
      if (
        props.selectedSubCategory() &&
        subCategoryName == props.selectedSubCategory().subCategoryName
      ) {
        setSelectedIdx(id);
        changeStyle(id);
      }
    });
  }, [subCategories]);

  const nextButton = () => {
    if (props.selectedSubCategory() != null) {
      return (
        <button id="nextButton" onClick={() => props.nextPage()}>
          Next
        </button>
      );
    } else {
      return (
        <div id="disabledButtonWrapper">
          <button id="disabledNextButton" onClick={() => props.nextPage()}>
            Next
          </button>
        </div>
      );
    }
  };

  const changeStyle = (idx) => {
    console.log(idx, props.selectedSubCategory());
    subCategories.map(({ subCategoryName, id, categoryName }) => {
      var tableRow = "id" + id;
      var element = document.getElementsByClassName(tableRow);
      //console.log(element);
      console.log("here2, ", id, idx);
      if (id == idx) {
        element[0].style.backgroundColor = "rgb(201 212 231)";
        element[0].style.border = "1px solid black";
      } else {
        element[0].style.backgroundColor = "#FFFFFF";
        element[0].style.border = "1px solid rgb(197, 197, 197)";
      }
    });
  };

  var idx = 0;
  if (subCategories !== null) {
    return (
      <div id="body">
        <div id="container">
          <div id="left">Please select a subcategory</div>
          <div id="right">
            <div id="top">
              {/* <Link to="/host/home"><button id="saveAndExit" onClick={()=>{this.props.saveAndExit()}}>Save and Exit</button></Link> */}
            </div>

            <div id="middle">
              <table>
                <tbody>
                  {subCategories.map(
                    ({ subCategoryName, id, categoryName }) => {
                      idx = idx + 1;
                      //console.log(category.category);

                      return (
                        <tr
                          key={idx}
                          onClick={() => {
                            props.selectSubCategory({
                              subCategoryName,
                              id,
                              categoryName,
                            });
                            setSelectedIdx(id);
                            changeStyle(id);
                          }}
                        >
                          <td className={"id" + id}>{subCategoryName}</td>

                          {/* <td className={"tr" + id}>{category}</td> */}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>

            <div id="bottom">
              <button id="backButton" onClick={props.prevPage}>
                Back
              </button>
              {nextButton()}
              {/* <button id="nextButton" onClick={props.nextPage}>Next</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <header>Hello</header>;
  }
};

export default HostingPage2;
