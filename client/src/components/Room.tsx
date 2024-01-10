import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const Room = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const name = searchParams.get("name")

	useEffect(() => {
		// logic to init user to room
	}, [name])

	return (
		<div>
			<h1>Hi {name}</h1>
		</div>
	)
}
export default Room
