import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }


    componentDidMount() {

        function hackJs() {
            let example = "potato potato";
            console.log(example.replace(/pot/, "tom")); 
            // "tomato potato"
            console.log(example.replace(/pot/g, "tom")); 
            // "tomato tomato"
          
            let entries = [1, 2, 2, 3, 4, 5, 6, 6, 7, 7, 8, 4, 2, 1]
            let unique_entries = [...new Set(entries)];
            console.log(unique_entries);
            // [1, 2, 3, 4, 5, 6, 7, 8]  

            let converted_number = 5 + "";
            console.log(converted_number);
            // 5
            console.log(typeof converted_number); 
            // string

            let the_string = "123";
            console.log(+the_string);
            // 123
            
            let the_stringw = "hello";
            console.log(+the_stringw);
            // NaN  
            
            let my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            console.log(my_list.sort(function() {
                return Math.random() - 0.5
            })); 
            // [4, 8, 2, 9, 1, 3, 6, 5, 7]
            
            let entries2 = [1, [2, 5], [6, 7], 9];
            let flat_entries = [].concat(...entries2); 
            // [1, 2, 5, 6, 7, 9]
            
            // if (available) {
            //     addToCart();
            // } 
            //TO  
            // available && addToCart()

            const dynamic = 'flavour';
            var item = {
                name: 'Coke',
                [dynamic]: 'Cherry'
            }
            console.log(item); 
            // { name: "Coke", flavour: "Cherry" }

            var entries3 = [1, 2, 3, 4, 5, 6, 7];  
            console.log(entries3.length); 
            // 7  
            entries3.length = 4;  
            console.log(entries3.length); 
            // 4  
            console.log(entries3); 
            // [1, 2, 3, 4]

            var entries4 = [1, 2, 3, 4, 5, 6, 7]; 
            console.log(entries4.length); 
            // 7  
            entries4.length = 0;   
            console.log(entries4.length); 
            // 0 
            console.log(entries4); 
            // []            

        //  
          }

        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        userService.getAll().then(users => this.setState({ users }));
        hackJs();
    }





    render() {
        const { user, users } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React & Basic HTTP Authentication!!</p>
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.length &&
                    <ul>
                        {users.map((user, index) =>
                            <li key={user._id}>
                                {user.username + ' '}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}


export { HomePage };