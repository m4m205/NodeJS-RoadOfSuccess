const bundel = require('../models/mdl_bundel');



const bundelsLocationAndName= (req , res ) => {
      let provinceList = [{ province: 'Zeeland',names:[] },{province:'Utrecht',names:[]},{province:'Gelderland',names:[]} ];
      // bundel.find({}).select('province -_id').then(result=> {
          let dataToSend=[];
          provinceList.forEach(function(item){
            item.names=  bundel.find({province: item.province}).select('name -_id').then(name=> console.log(name))
              // dataToSend.push(bundel.find(item).select('name -_id'));

          })
          
          Promise.all( provinceList ).then(res.json(provinceList))
      // }).catch(err=>{
      //   res.end('You have error in list of locations!!!')
      // })
}

const listInProvince= (req , res ) => {
    // id of the province
    bundel.find({province:req.params.id }).then(result =>{
      res.json(result)
    }).catch(err=>{
      res.end('You have error in list province!!!')
    })


}
const showBundel= (req , res ) => {
    // id of the bundel
    bundel.find({_id:req.params.id }).then(result =>{
      res.json(result)
    }).catch(err=>{
      res.end('You have error in showBundel!!!')
    });
    // bundel.find({province:req.params.id}).then(result =>{
    //   res.json(result)
    // }).catch(err=>{
    //   res.end('You have error in showBundel!!!')
    // })



}

const listOfPages= (req , res ) => {

}
const getSettings= (req , res ) => {

}

module.exports = {
  showBundel: showBundel,
  listInProvince: listInProvince,
  bundelsLocationAndName:bundelsLocationAndName,
  listOfPages: listOfPages,
  getSettings: getSettings

}
