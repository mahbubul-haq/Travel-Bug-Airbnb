import React, { useEffect, useState } from 'react';

import '../cssFiles/HostingPage1.css';
import '../cssFiles/HostingPage1Base.css';




const HostingPage1 = (props) => {

  const [categories, setCategories] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);



  useEffect(() => {
    //console.log("ca: " + props.selectedCategory());

  
        fetch("http://localhost:5000/experience/categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
          if (res.ok) return res;
          else {
            throw new Error("Something went wrong");
          }
        })
        .then(res => {
            //console.log(res.json());
            return res.json();
        })
        .then(data => { 
            console.log(data);
            const cats = data.map(cat => {
              return {category: cat.categoryName, id: cat._id};});
            console.log(cats);

            setCategories(cats);
          
        })
        .catch(err => {
            console.log(err);
        })
        
    
      //setCategories([{category: "Animal", id : 7 },{category: "Science", id : 6}, {category: "Nature & outdoors", id : 1}, {category: "Astronomy", id : 2}, {category : "Laboratory", id : 3}, {category : "Ancient Architecture", id: 4}])
      //console.log(categories);
      
    }, []);

    useEffect(() => {
      categories.map(({category, id}) => {
        //console.log("cat: " + category);
          if (props.selectedCategory() && category == props.selectedCategory().category)
          {
              setSelectedIdx(id);
              changeStyle(id);
          }
      })
      
    }, [categories])
    
  const changeStyle = (idx)=> {
    categories.map(({category, id}) => {
      var tableRow = "id" + id;
      var element = document.getElementsByClassName(tableRow);
      //console.log(element);

      if (id === idx) {
        element[0].style.backgroundColor = "rgb(201 212 231)";
        element[0].style.border = "1px solid black";
      } else {
        element[0].style.backgroundColor = "#FFFFFF";
        element[0].style.border = "1px solid rgb(197, 197, 197)";
      }
    });
  }

  
  var idx = 0;
  if (categories !== null) {
      return (
        <div id="body">
          <div id="container">
            <div id="left">What is the theme of your experience?</div>
            <div id="right">
              <div id="top">
                {/* <Link to="/host/home"><button id="saveAndExit" onClick={()=>{this.props.saveAndExit()}}>Save and Exit</button></Link> */}
                
              </div>

              <div id="middle">
                <table>
                  {categories.map(({category, id}) => {
                    idx = idx + 1;
                    //console.log(category.category);

                    return (
                      <tr
                        key={idx}
                        onClick={() => {
                          props.selectCategory({category, id});
                          setSelectedIdx(id);
                          changeStyle(id);
                        }}
                      >
                        <td className={"id" + id}>{category}</td>

                        {/* <td className={"tr" + id}>{category}</td> */}
                      </tr>
                    );
                  })}
                </table>
              </div>

              <div id="bottom">
                <button id="backButton" onClick={props.prevPage}>Back</button>

                <button id="nextButton" onClick={props.nextPage}>Next</button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <header>Hello</header>;
    }
}

export default HostingPage1
