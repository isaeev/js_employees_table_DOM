var e,t="desc",n=function(e,t){var n=document.createElement("div"),r=e.charAt(0).toUpperCase()+e.slice(1);n.classList.add("notification",e),n.innerHTML='\n    <h2 class="title">'.concat(r,"</h2>\n    <p>").concat(t,"</p>\n  "),n.style.top="10px",n.style.right="10px",n.setAttribute("data-qa","notification"),document.body.append(n),setTimeout(function(){n.remove()},2e3)},r=document.querySelector("table"),a=document.querySelectorAll("th"),i=[],o={name:"asc",position:"asc",office:"asc",age:"asc",salary:"asc"},c=function(e){switch(e.target.innerText){case"Name":if("asc"===o.name){i.sort(function(e,t){return e.name.localeCompare(t.name)}),o.name=t;break}i.sort(function(e,t){return t.name.localeCompare(e.name)}),o.name="asc";break;case"Position":if("asc"===o.position){i.sort(function(e,t){return e.position.localeCompare(t.position)}),o.position=t;break}i.sort(function(e,t){return t.position.localeCompare(e.position)}),o.position="asc";break;case"Office":if("asc"===o.office){i.sort(function(e,t){return e.office.localeCompare(t.office)}),o.office=t;break}i.sort(function(e,t){return t.office.localeCompare(e.office)}),o.office="asc";break;case"Age":if("asc"===o.age){i.sort(function(e,t){return e.age-t.age}),o.age=t;break}i.sort(function(e,t){return t.age-e.age}),o.age="asc";break;case"Salary":if("asc"===o.salary){i.sort(function(e,t){return e.salary-t.salary}),o.salary=t;break}i.sort(function(e,t){return t.salary-e.salary}),o.salary="asc"}for(;r.rows.length>2;)r.deleteRow(1);i.forEach(function(e){var t=document.createElement("tr"),n=e.salary.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0});t.innerHTML="\n      <td>".concat(e.name,"</td>\n      <td>").concat(e.position,"</td>\n      <td>").concat(e.office,"</td>\n      <td>").concat(e.age,"</td>\n      <td>").concat(n,"</td>\n    "),r.insertBefore(t,r.lastElementChild)})};(e=document.querySelectorAll("tr")).forEach(function(t,n){if(0!==n&&n!==e.length-1){t.addEventListener("click",function(){e.forEach(function(e){return e.classList.remove("active")}),t.classList.add("active")});var r={name:t.children[0].textContent,position:t.children[1].textContent,office:t.children[2].textContent,age:parseInt(t.children[3].textContent),salary:parseFloat(t.children[4].textContent.replace(/[$,]/g,""))};i.push(r)}}),a.forEach(function(e){e.addEventListener("click",function(e){return c(e)})});var s=document.createElement("form");s.classList.add("new-employee-form");var l=["name","position","office","age","salary"];l.forEach(function(e){var t=document.createElement("label");if(t.innerText="".concat(e.charAt(0).toUpperCase()+e.slice(1),":"),t.setAttribute("for",e),"office"===e){var n=document.createElement("select");n.setAttribute("name",e),n.setAttribute("data-qa",e),["Tokyo","Singapore","London","New York","Edinburgh","San Francisco"].forEach(function(t){var r=document.createElement("option");r.setAttribute("value",t),r.innerText=t,n.id=e,n.appendChild(r),n.setAttribute("required","true")}),t.appendChild(n),s.appendChild(t);return}var r=document.createElement("input");r.setAttribute("name",e),r.setAttribute("data-qa",e),r.setAttribute("required","true"),r.id=e,"age"===e||"salary"===e?r.setAttribute("type","number"):r.setAttribute("type","text"),t.appendChild(r),s.appendChild(t)});var u=document.createElement("button");u.type="submit",u.innerText="Save to table",s.appendChild(u),document.body.appendChild(s);var d=function(e){e.preventDefault();var t=new FormData(s);if(l.some(function(e){return""===t.get(e).trim()})){n("error","All fields are required");return}var a={name:t.get("name").trim(),position:t.get("position").trim(),office:t.get("office").trim(),age:parseInt(t.get("age").trim()),salary:parseFloat(t.get("salary").trim())};if(a.name.length<4){n("error","Name value has less than 4 letters");return}if(a.position.length<1){n("error","Position value can not be empty");return}if(a.salary<1){n("error","Salary can not be empty");return}if(a.age<18||a.age>90){n("error","Age value is less than 18 or more than 90");return}i.push(a);var o=document.createElement("tr"),c=a.salary.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0});o.innerHTML="\n    <td>".concat(a.name,"</td>\n    <td>").concat(a.position,"</td>\n    <td>").concat(a.office,"</td>\n    <td>").concat(a.age,"</td>\n    <td>").concat(c,"</td>\n  "),r.insertBefore(o,r.lastElementChild),n("Success","New employee is successfully added to the table"),s.reset()};s.addEventListener("submit",function(e){return d(e)}),r.addEventListener("click",function(e){var t=e.target.innerText,r=e.target;if("td"===r.tagName.toLowerCase()){var a=document.createElement("input");a.classList.add("cell-input"),a.value=t,r.innerHTML="",r.appendChild(a),a.focus();var o=function(e,t){switch(t){case 0:if(e.length<4)return n("error","Name value must have at least 4 letters"),!1;if(i.some(function(t){return t.name===e}))return n("error","An employee with this name already exists"),!1;break;case 1:if(""===e.trim())return n("error","Position cannot be empty"),!1;break;case 2:if(!["Tokyo","Singapore","London","New York","Edinburgh","San Francisco"].includes(e))return n("error","Office must be one of the predefined options"),!1;break;case 3:var r=parseInt(e);if(r<18||r>90)return n("error","Age value must be between 18 and 90"),!1;break;case 4:var a=parseFloat(e.replace(/[$,]/g,""));if(isNaN(a)||a<=0)return n("error","Salary must be a positive number"),!1}return!0},c=r.cellIndex;a.addEventListener("blur",function(){var e=a.value;if(!o(e,c)){r.innerHTML=t;return}r.innerHTML=e;var n=r.parentElement.rowIndex-1;switch(c){case 0:i[n].name=e;break;case 1:i[n].position=e;break;case 2:i[n].office=e;break;case 3:i[n].age=parseInt(e);break;case 4:i[n].salary=parseFloat(e.replace(/[$,]/g,""))}}),a.addEventListener("keydown",function(e){"Enter"===e.key&&a.blur()})}});
//# sourceMappingURL=index.e519e51e.js.map
