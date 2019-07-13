import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
const StyledComponents = styled.div`
  div {
    font-size: 11px;
    line-height: 1.8;
    display: block;
  }
  .eno-product-list {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .eno-product {
    padding: 8px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .image-view {
    height: 140px;
    width: 140px;
    margin: 5px 0;
  }
  .image-view .eno-product-image {
    height: 140px;
    width: 140px;
  }
  .image-view eno-image {
    width: 320px;
    height: 240px;
    display: inline-block;
    overflow: hidden;
    position: relative;
  }
  .eno-product-title {
    width: 128px;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height: 1.5;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .eno-product-price {
    margin-top: 4px;
    font-size: 11px;
    line-height: 1.5;
    position: relative;
  }
  .eno-product-price .eno-product-price-favour {
    color: #888888;
    text-decoration: line-through;
    margin-left: 4px;
  }
  .eno-product-price .eno-product-price-original {
    color: #e80080;
  }
  .eno-product-price .eno-product-tip {
    position: absolute;
    right: 4px;
    background-color: #ff3333;
    color: #ffffff;
    padding: 0 4px;
    border-radius: 2px;
  }
`;

class ProductList extends WeElement {
  constructor(...args) {
    super(...args);
    this.state = {
      productList: [
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg",
          title: "Apple iPhone X 256GB 深空灰色 移动联通电信4G手机",
          originalPrice: 9999,
          favourPrice: 8888,
          tip: "自营"
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg",
          title: "Apple iPad 平板电脑 2018年新款9.7英寸",
          originalPrice: 3499,
          favourPrice: 3399,
          tip: "优惠"
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg",
          title:
            "Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）",
          originalPrice: 12999,
          favourPrice: 10688,
          tip: "秒杀"
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product4.jpg",
          title: "Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色",
          originalPrice: 999,
          favourPrice: 958,
          tip: "秒杀"
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product5.jpg",
          title:
            "微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）",
          originalPrice: 8888,
          favourPrice: 8288,
          tip: "优惠"
        },
        {
          image:
            "https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg",
          title:
            "Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）",
          originalPrice: 2899,
          favourPrice: 2799,
          tip: "自营"
        }
      ],
      renderImage: false
    };
  }

  render() {
    return h(
      StyledComponents,
      null,
      h(
        "div",
        {
          className: "page"
        },
        h(
          "div",
          {
            className: "eno-product-list"
          },
          this.state.productList.map((item, index) => {
            return h(
              "div",
              {
                key: index,
                className: "eno-product"
              },
              h(
                "div",
                {
                  className: "image-view"
                },
                h("img", {
                  className: "eno-product-image",
                  src: item.image
                })
              ),
              h(
                "div",
                {
                  className: "eno-product-title"
                },
                item.title
              ),
              h(
                "div",
                {
                  className: "eno-product-price"
                },
                h(
                  "span",
                  {
                    className: "eno-product-price-favour"
                  },
                  "\uFFE5",
                  item.originalPrice
                ),
                h(
                  "span",
                  {
                    className: "eno-product-price-original"
                  },
                  "\uFFE5",
                  item.favourPrice
                ),
                h(
                  "span",
                  {
                    className: "eno-product-tip"
                  },
                  item.tip
                )
              )
            );
          })
        )
      )
    );
  }
}

ProductList.css = `div{font-size:11px;line-height:1.8;display:block}.eno-product-list{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.eno-product{padding:8px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.image-view{height:140px;width:140px;margin:5px 0}.image-view .eno-product-image{height:140px;width:140px}.image-view eno-image{width:320px;height:240px;display:inline-block;overflow:hidden;position:relative}.eno-product-title{width:128px;word-break:break-all;display:-webkit-box;overflow:hidden;line-height:1.5;-o-text-overflow:ellipsis;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:2}.eno-product-price{margin-top:4px;font-size:11px;line-height:1.5;position:relative}.eno-product-price .eno-product-price-favour{color:#888888;text-decoration:line-through;margin-left:4px}.eno-product-price .eno-product-price-original{color:#e80080}.eno-product-price .eno-product-tip{position:absolute;right:4px;background-color:#ff3333;color:#ffffff;padding:0 4px;border-radius:2px}`;
export default ProductList;
