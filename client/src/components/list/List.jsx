import "./List.scss"

import Card from "../card/Card"

const List = ({posts}) => {
  // console.log(posts)

  return (
    <>
      {posts.length !== 0 ? (
        <div className="list">
          {posts.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="list">Empty list !</div>
      )}
    </>
  )
}

export default List
