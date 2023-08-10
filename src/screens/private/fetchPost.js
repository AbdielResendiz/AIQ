
const fetchPost = async (url, data) => {
    try{
        const res= await fetch(url, data);
        const resultado = await res.json();
        return resultado;
    }
    catch(e){
         console.log("url:", url , "error", e)
    }
   }

   export default fetchPost;