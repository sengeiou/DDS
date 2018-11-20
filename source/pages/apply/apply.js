// pages/driver/driver.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { OrderApi } from "../../apis/order.api.js";
import { date } from "../../apis/order.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.setMyData({

    })

    this.setData({
      array: ['所有', '离我最近', '费用最高'],
      objectArray: [
        {
          id: 0,
          name: '所有'
        },
        {
          id: 1,
          name: '离我最近'
        },
        {
          id: 2,
          name: '费用最高'
        }

      ],
      index: 0,
      tab: 0,


    })

    super.onLoad(options);

  }


  //界面标题
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '报名详情',

    });
  }


  onMyShow() {
    var that = this;
    //查询所有列表 
    
    var orderapi = new OrderApi();
    console.log(66666666);
    console.log(this.Base.options.orderid)
    orderapi.applylist({ orderid: this.Base.options.orderid}, (list1) => {
      this.Base.setMyData({ list1 });


      orderapi.info({id: this.Base.options.id}, (list2) => {

        this.Base.setMyData(list2);

      })

      })

    
    
    }
    
  qwe(e) {
    this.setData({
      index: e.detail.value
    })
  }
  changetab(e) {
    this.Base.setMyData({ tab: e.currentTarget.id });
  }

}
var tab = null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.qwe = content.qwe;
body.changetab = content.changetab;
Page(body)