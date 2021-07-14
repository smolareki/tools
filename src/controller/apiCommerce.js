const { response } = require('express');
const request = require('request');
const dotenv = require('dotenv').config()

var basic = dotenv.parsed.PASSWORD

module.exports = {
  async GetProduct(req,res){
    const { store, method, id} = req.body;
    var json;
    var catalog;

    switch(method){
      case 'GetOrderByNumber':
      case 'GetOrder':   
          catalog = 'sales'
      break;  
      case 'GetPerson':
      case 'GetCompany':
          catalog = 'Profile'
      break;
      case 'GetProduct':
      case 'GetSku':
          catalog = 'Catalog'
      break;    
    }

    var options = {
      'method': 'POST',
      'url': 'https://'+store+'.layer.core.dcg.com.br/v1/'+catalog+'/API.svc/web/'+method,
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+basic
      },
      body: JSON.stringify(id)
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      json = response.body
     
      if(json != ''){      
          try {
            res.status(200).json(JSON.parse(response.body))
          } catch {
              res.status(200).json({message: "Dados Inválidos"})
            }        
      }
      else{
        res.status(500).json({message: "Nada Encontrado. Certifique-se que esteja usando o ID correto com o Método correto."})
      }
      
    });
    
    
    

  }//end GetProduct Function

}// end module exports
