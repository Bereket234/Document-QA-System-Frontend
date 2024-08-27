import { Link, useRouteError } from "react-router-dom"
import { Image, Container, Text } from "@chakra-ui/react"

export default function Error() {
  const error = useRouteError()

  return (
    <Container mt='20vh' className="careers-error">
      <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFc3D5lnamlkQhg78kaJbfZ2317r7TrOQLVg&usqp=CAU' />
      <Text textAlign='center'>{error.message}</Text>
      <Link style={{color: 'blue', textAlign:'center'}} to="/">Back to the Homepage</Link>
    </Container>
  )
}