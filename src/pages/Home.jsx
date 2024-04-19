import React from 'react';
import axios from 'axios';
import { Card, Dropdown } from '../components';

function Home() {
  const isMounted = React.useRef(true);

  const [users, setUsers] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');

      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (!isMounted.current) {
      getUsers();
    }
    isMounted.current = false;
  }, []);

  return (
    <>
      <main>
        <div className='wrapper'>
          {!users.length ? (
            <div className='loader'></div>
          ) : (
            <>
              <Dropdown users={users} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
              <div className='section cards'>
                {users.length ? (
                  selectedValue.length ? (
                    users.map((user) => {
                      if (selectedValue.includes(user.name)) {
                        return <Card key={user.id} user={user} />;
                      }
                    })
                  ) : (
                    users.map((user) => <Card key={user.id} user={user} />)
                  )
                ) : (
                  <span className='loader'></span>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
