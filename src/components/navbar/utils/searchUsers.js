export const findUsers =(users,searchText)=>{
return (users?.length>0&&(searchText.length>0))?users.filter(({username,fullname})=>{
     return username.toLowerCase().includes(searchText.toLowerCase()) || fullname.toLowerCase().includes(searchText.toLowerCase);
 }):[];
}