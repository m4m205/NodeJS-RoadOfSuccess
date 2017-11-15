const bundel = require('../models/mdl_bundel');



const bundelsLocationAndName= (req , res ) => {
      var provinceList = [{ province: 'Zeeland',count:[] }, {province:'Utrecht',count:[]},
                          {province:'South Holland',count:[]}, {province:'Overijssel',count:[]},
                          {province:'North Holland',count:[]}, {province:'North Brabant',count:[]},
                          {province:'Limburg',count:[]}, {province:'Groningen',count:[]},
                          {province:'Gelderland',count:[]}, {province:'Friesland',count:[]},
                          {province:'Flevoland',count:[]}, {province:'Drenthe',count:[]}
                        ];

          var dataNotSend=[];
          provinceList.forEach(function(item, index){
            var temp =  new Promise( (resolve, reject) => {
                bundel.find({province: item.province}).select('name -_id').then(name=>{
                      provinceList[index].count = name.length ;
                      resolve(1);
                })
              });
              dataNotSend.push(temp);
          })
          Promise.all( dataNotSend ).then(() => {res.json(provinceList)})
        .catch(err=>{
        res.end('You have error in list of locations!!!')
      })
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
