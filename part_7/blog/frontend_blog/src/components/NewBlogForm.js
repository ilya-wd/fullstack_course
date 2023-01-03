import { Form, Button } from 'react-bootstrap'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const NewBlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value
    dispatch(createBlog(title, author, url))
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
  }
  const style = {
    margin: 10,
    padding: 5,
  }

  const styleButton = {
    marginTop: 5,
  }
  return (
    <div style={style}>
      <h2>Create new</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          Title
          <Form.Control id="title" type="text" placeholder="title of the blog" />
        </div>
        <div>
          Author
          <Form.Control id="author" type="text" placeholder="author of the blog" />
        </div>
        <div>
          url
          <Form.Control id="url" type="text" placeholder="url of the blog" />
        </div>
        <Button style={styleButton} id="create-button" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlogForm
