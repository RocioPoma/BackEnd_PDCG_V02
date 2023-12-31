const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');


router.get('/get', (req, res) => {
    const sql = 'SELECT * FROM entidad_financiera';
    connection.query(sql, (err, result) => {
      if (err){
        console.log(err);
      res.status(500).json({message:'error al obtener entidades financieras'});
      }
      res.json(result);
    });
  });
  
  router.get('/buscar/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM entidad_financiera WHERE id_entidad_financiera = ?';
    connection.query(sql, id, (err, result) => {
      if (err){
        console.log(err);
      res.status(500).json({message:'error al buscar entidad financiera por id'});
      }
      res.json(result[0]);
    });
  });
  
  router.post('/create', (req, res) => {
    const { nom_entidad_financiera, desc_entidad_financiera, estado } = req.body;
    const sql = 'INSERT INTO entidad_financiera (nom_entidad_financiera, desc_entidad_financiera, estado) VALUES (?, ?, ?)';
    connection.query(sql, [nom_entidad_financiera, desc_entidad_financiera, estado], (err, result) => {
      if (err) {
        console.log(err);
      res.status(500).json({message:'error al insertar nueva entidad financiera'});
      }
      res.status(201).json({ message: 'Entidad financiera creada correctamente' });
    });
  });
  
  router.put('/update/', (req, res) => {   
    const { nom_entidad_financiera, desc_entidad_financiera, estado,id_entidad_financiera } = req.body;
    const sql = 'UPDATE entidad_financiera SET nom_entidad_financiera = ?, desc_entidad_financiera = ?, estado = ? WHERE id_entidad_financiera = ?';
    connection.query(sql, [nom_entidad_financiera, desc_entidad_financiera, estado, id_entidad_financiera], (err, result) => {
      if (err) {
        console.log(err);
      res.status(500).json({message:'error al acutalizar entidad financiera'});
      }
      res.json({ message: 'Entidad financiera actualizada correctamente' });
    });
  });
  
  
  router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM entidad_financiera WHERE id_entidad_financiera = ?';
    connection.query(sql, id, (err, result) => {
      if (err){
        console.log(err);
      res.status(500).json({message:'error al borrar entidad financiera por id'});
      }
      res.json({ message: 'Entidad financiera eliminada correctamente' });
    });
  });
  

  //status entidad financiera
router.patch('/updateStatus',(req,res)=>{
  let financiera =req.body;
  console.log(financiera);
  var query = "update entidad_financiera set estado=? where id_entidad_financiera=?";
  connection.query(query,[financiera.estado,financiera.id_entidad_financiera],(err,results)=>{
      if(!err){
          if(results.affectedRows == 0){
              res.status(404).json({message:"La entidad no existe"});
          }
           res.status(200).json({message:"Actualización Estado de estado fue un éxito"});
      }
      else{
          console.log(err);
           res.status(500).json({message:'error al actualizar estado de entidad financiera por id'});
      }
  })
  });
  

module.exports = router;