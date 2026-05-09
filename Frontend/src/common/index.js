const backendDomain= "http://localhost:8081"
const SummaryApi = {
    User : {
        url : `${backendDomain}/api/user`,
        method : "get"
    },
    login:{
        url:`${backendDomain}/api/login`,
        method : "post"
    },
    logout:{
        url:`${backendDomain}/api/logout`,
        method:"post"
    },
    signup:{
        url:`${backendDomain}/api/signup`,
        method:"post" 
    },
    stories:{
        url:`${backendDomain}/api/stories`,
        method:"get"
    },
    bookmark:{
          url:`${backendDomain}/api/stories/bookmark`,
        method:"post"
    }
    }
   
   export default SummaryApi;