import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();

  return (
    <div>EditPost {id}</div>
  )
}

export default EditPost