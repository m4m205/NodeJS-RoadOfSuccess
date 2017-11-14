const bundel = require('../models/mdl_bundel');



const interviewedLocation= (req , res ) => {
      bundel.fine({}).then(result=> {
        res.json(result)
      }).catch(err=>{
        res.end('You have error in list of locations!!!')
      })
}

const listInProvince= (req , res ) => {
    // id of the province
    bundel.fine({province:req.params.id }).then(result =>{
      res.json(result)
    }).catch(err=>{
      res.end('You have error in list province!!!')
    })


}
const showBundel= (req , res ) => {
    // id of the bundel
    bundel.fine({_id:req.body.id }).then(result =>{
      res.json(result)
    }).catch(err=>{
      res.end('You have error in showBundel!!!')
    });
    bundel.fine({province:req.params.id}).then(result =>{
      res.json(result)
    }).catch(err=>{
      res.end('You have error in showBundel!!!')
    })



}

const listOfPages= (req , res ) => {

}
const getSettings= (req , res ) => {

}

module.exports = {
  showBundel: showBundel,
  listInProvince: listInProvince,
  interviewedLocation:interviewedLocation,
  listOfPages: listOfPages,
  getSettings: getSettings

}
