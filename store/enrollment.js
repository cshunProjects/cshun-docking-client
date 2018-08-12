function date2str(obj) {
  console.log(obj)
  const _ = (date) => {
    date = new Date(date);
    console.log(date);
    return `${date.getFullYear()}-${date.getMonth()}`;
  }
  return { ...obj,
    marketDateBegin: _(obj.marketDateBegin),
    marketDateEnd: _(obj.marketDateEnd)
  }
}

function str2dat(obj) {
  return { ...obj,
    marketDateBegin: new Date(obj.marketDateBegin.slice(0, 4), obj.marketDateBegin.slice(4, 6)),
    marketDateEnd: new Date(obj.marketDateEnd.slice(0, 4), obj.marketDateEnd.slice(4, 6))
  }
}

export const state = () => ({
  mainBodies: [],
  enrollments: []

})
export const getters = {
  fruitAndVegEnrollments: (state) => state.enrollments.filter((_) => _.type === 'FruitAndVeg'),
  fruitAndVegEnrollmentAnalytics:(state,{fruitAndVegEnrollments})=>{
    return {
      itemEachDistrict:fruitAndVegEnrollments.reduce((result,current)=>{
        if(!result[current.district]) result[current.district] = {columns:['category','production'],rows:[]};
        let currentRows =  result[current.district].rows;
        console.log(currentRows);
        for(let row of currentRows){
          console.log(row,current.category);
          if(row.category === current.category) {
            row.production+=parseInt(current.production,10);
            return result;
          }
        }
        currentRows.push({category:current.category,production:parseInt(current.production,10)});
        return result;
      },{})
    }
  },
  birdEnrollments: (state) => state.enrollments.filter((_) => _.type === 'Bird'),
  animalEnrollments: (state) => state.enrollments.filter((_) => _.type === 'Animal'),
  productEnrollments: (state) => state.enrollments.filter((_) => _.type === 'Product')
}
export const mutations = {
  updateAllMainBodies(state, mainBodies) {
    state.mainBodies = mainBodies
  },
  updateSingleMainBody(state, mainBody) {
    state.mainBodies = state.mainBodies.map(_ => _.id === mainBody.id ? mainBody : _)
  },
  deleteSingleMainBody(state, mainBodyId) {
    state.mainBodies = state.mainBodies.filter(_ => _.id !== mainBodyId)
  },
  createSingleMainBody(state, mainbody) {
    state.mainBodies = [...state.mainBodies, mainbody]
  },
  updateAllEnrollments(state, enrollments) {
    state.enrollments = enrollments
  },
  updateSingleEnrollment(state, enrollment) {
    state.enrollments = state.enrollments.map(_ => _.id === enrollment.id ? enrollment : _)
  },
  deleteSingleEnrollment(state, enrollmentId) {
    state.enrollments = state.enrollments.filter(_ => _.id !== enrollmentId)
  },
  createSingleEnrollment(state, enrollment) {
    state.enrollments = [...state.enrollments, enrollment]
  }
}

export const actions = {
  refetchMainBodies({
    commit
  }) {
    return this.$axios.get("/mainbody")
      .then(({
        data
      }) => commit('updateAllMainBodies', data))
      .catch((err) => console.error(err))
  },
  createOrUpdateMainBody({
    commit
  }, mainbody) {
    const isCreate = !mainbody.id
    return this.$axios.request({
        method: isCreate ? 'post' : 'put',
        url: '/mainbody' + (isCreate ? "" : `/${mainbody.id}`),
        data: mainbody
      })
      .then(({
        data
      }) => commit(isCreate ? 'createSingleMainBody' : 'updateSingleMainBody', data))
      .catch((err) => console.error(err))
  },
  deleteMainBody({
    commit
  }, {
    id
  }) {
    return this.$axios.request({
        method: 'delete',
        url: `/mainbody/${id}`
      })
      .then(() => commit('deleteSingleMainBody', id))
      .catch((err) => console.error(err))
  },
  refetchEnrollments({
    commit
  }) {
    return this.$axios.get("/enrollment")
      .then(({
        data
      }) => commit('updateAllEnrollments', data))
      .catch((err) => console.error(err))
  },
  createOrUpdateEnrollment({
    commit
  }, enrollment) {
    const isCreate = !enrollment.id
    return this.$axios.request({
        method: isCreate ? 'post' : 'put',
        url: '/enrollment' + (isCreate ? "" : `/${enrollment.id}`),
        data: enrollment
      })
      .then(({
        data
      }) => commit(isCreate ? 'createSingleEnrollment' : 'updateSingleEnrollment', data))
      .catch((err) => console.error(err))
  },
  deleteEnrollment({
    commit
  }, {
    id
  }) {
    return this.$axios.request({
        method: 'delete',
        url: `/enrollment/${id}`
      })
      .then(() => commit('deleteSingleEnrollment', id))
      .catch((err) => console.error(err))
  }
}
