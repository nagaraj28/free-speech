export const findUsers =(users,searchText)=>{
return (users&&(searchText.length>0))?users.filter(({username,fullname})=>{
     return username.toLowerCase().includes(searchText.toLowerCase()) || fullname.toLowerCase().includes(searchText.toLowerCase);
 }):[];
}