export default {
  users: {
    byId: {
      23: { id: 23, firstName: "Bill", age: 21, companyId: 1 },
      44: { id: 44, firstName: "Sara", age: 22, companyId: 2 },
      49: { id: 49, firstName: "Nick", age: 28, companyId: 1 },
    },
    allIds: [23, 44, 49],
  },
  companies: {
    byId: {
      1: { id: 1, name: "Apple", description: "iphone" },
      2: { id: 2, name: "Google", description: "search" },
      3: { id: 2, name: "Encode", description: "marketing" },
    },
    allIds: [1, 2, 3],
  },
  likes: { myLikes: 0, id: 111 },
};
