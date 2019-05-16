// 测试使用mongoose操作mongdb数据库
const md5 = require('blueimp-md5'); //MD5加密的函数
// 1.1引入mongoose
const mongoose = require('mongoose');
// 1.2连接指定数据库（url只有数据库是变化的）
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser: true});
// 1.3获取连接对象
const conn = mongoose.connection;
// 1.4绑定连接完成的监听（用来提示连接成功）
conn.on('connected',function(){//连接成功回调
    console.log('数据库连接成功，YES');

});


// conn.on("error", function (error) {  
//     console.log("数据库连接失败：" + error); 
//   }); 
  
// conn.on("open", function () {  
//     console.log("数据库连接成功"); 
//   });

// 2.得到对应特定集合的Model
// 2.1字义Schema(描述文档结构)
const userSchema = mongoose.Schema({ //指定文档结构：属性名、属性值的类型，是否是必须的，默认值
  username:{type:String, required:true},//用户名
  password:{type:String, required:true},// 密码
  type:{type:String, required:true}     // 用户类型：dashen/laoban
  
});
// 2.2定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user',userSchema); //集合名：users
// 3.通过Model或其实例对集合数据进行CRUD操作
// 3.1通过Model实例的save()添加数据
function testSave(){
  // 创建UserModel的实例
  const userModel = new UserModel({
        username: 'Tom', password:md5('123'), type:'dashen'
      });
      // 调用save()保存
      userModel.save(function(error, userDoc){
        console.log('save()',error,userDoc);
        
      })
};

// testSave();
// 3.2通过Model的find/findOne()查询多个或一个数据
function testFind(){
  // 查询多个:得到是包含所有匹配文档对象的数组，如果没有匹配的就是[]
   UserModel.find(function(error,users){
     console.log('find()', error, users);
   })
  //  查询一个：得到是匹配的文档对象，如果没有匹配的就是null
   UserModel.findOne({_id: '5cc53a97ea96181b3fb485c6'},function(error,user){
     console.log('findOne()',error,user);
     
   })
}

// testFind()

// 3.3通过Model的findByIdAndUpdate()更新某个数据
function testUpdate(){
  UserModel.findByIdAndUpdate(
    {_id: '5cc53e28637a461d5f283f78'},
    {username:'Jack',type:'laoban'},function(error,oldUser){
      console.log('findByIdAndUpdate()',error,oldUser);
      
    })
}
// testUpdate()

// 3.4通过Model的remove()删除匹配的数据
function testDelete(){
  UserModel.remove(
    {_id: '5cc53a97ea96181b3fb485c7'},
    function(error,doc){
      console.log('remove()',error,doc);//{ ok: 1, n: 0, deletedCount: 0 }
      
    })
}
// testDelete()