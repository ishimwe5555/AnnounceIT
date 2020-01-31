const users = [
    {
        id:1, 
        firstname : 'norbert',
        lastname: 'ishimwe',
        username : 'norbert', 
        email: 'norbert@gmail.com',
        password : 'norberty',
         phonenumber:'0782467474', 
         isAdmin:'false'
    },
    {
        id:2,
         firstname : 'norbertoh',
         lastname: 'ishimwe',
        username : 'norberti', 
        email: 'norbert@gmail.com',
        password : 'norberty',
         phonenumber:'0782467474', 
         isAdmin:'false'
    },
    {
        id:3,
         firstname : 'norbert',
         lastname: 'ishimwe',
        username : 'norberthh',
        email:'whatever@yahoo.com',
         password : 'noerb',
         phonenumber:'0782467474', 
         isAdmin:'false'
    },
];

const announcements = [
    {
        id:1, 
        owner : 1, //user id
        status: 'active',
        text : 'norbert', 
        start_date : '10/10/2020',
         end_date:'5/5/2021', 
         
    },
    {
        id:2,
        owner : 1, //user id
        status: 'active',
        text : 'norbert', 
        start_date : '10/10/2020',
         end_date:'5/5/2021', 
    },
    {
        id:3,
        owner : 1, //user id
        status: 'active',
        text : 'norbert', 
        start_date : '10/10/2020',
         end_date:'5/5/2021', 
    },
];
export default { users, announcements };
