//Building Trello with Drag and Drop 77
//We want to be able to work with arrays with any kind of items in them, so we use a
//generic type T.
//Then we calculate the startIndex. We make sure that it’s always a positive number.
//If our destination index is smaller than zero - we use array length plus the destination
//index. We do this because if you pass a negative index to splice function it will begin
//that many elements from the end. So we can end up adding an item to the wrong
//spot.
//After we’ve calculated the startIndex that is always a positive number we can move
//items around. First, we remove the item with the from index and store it in the item
//const. Then we insert that item at startIndex position.

export const moveItem = <T>(array: T[], from: number, to: number) => {
const startIndex = to < 0 ? array.length + to : to;
const item = array.splice(from, 1)[0]
array.splice(startIndex, 0, item)
return array
}