import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    fetch('https://localhost:8000/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        return data['hydra:member'];
      });
  }, [tasks]);

  console.log(tasks);
  return (
    <div>
      <span></span>
    </div>
  );
};

export default Home;
