import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  return (
    <div>SinglePost {id}</div>
  )
}

export default SinglePost