/**
 * Created by bassxiaosen1 on 2017/10/21.
 */
var webpack = require("webpack")
var path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")


module.exports={
    // devtool: 'source-map',
    entry:['babel-polyfill', __dirname+'/src/entry.js'],//项目打包入口文件
    output: {
        path: path.resolve(__dirname,'dist'), // 必须使用绝对地址，输出文件夹
        filename: "bundle.js", //项目打包出口文件
        publicPath: "dist/" // 知道如何寻找资源
    },
    module: {
        rules:[{
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                fallback:'style-loader',
                use: [
                    {
                        loader:'css-loader'
                    },{
                        loader:'postcss-loader'
                    }
                ]
            })
        },{
            test:/\.(png|jpg|jpe|jpeg|gif|svg)$/,
            loader:'url-loader',
            options:{
                // 限制 图片大小 1048576B，小于限制会将图片转换为 base64格式
                limit:1048576,
                // 超出限制，创建的文件格式
                // dist/images/[图片名].[hash].[图片格式]
                name: 'images/[name].[hash].[ext]'
            }
        },{
            test: /\.(jsx|js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015', 'stage-0']
            }
        }]
    },
    plugins: [
        //输出的文件路径
        new webpack.BannerPlugin('IPBase 2017-2018 CaiYusen@Copyright'),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:"./index.html",
            inject:false
        }),
        new CleanWebpackPlugin(['dist/bundle.js','dist/css/main.css']),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' // 指定公共 bundle 的名称。
        //  })
    ],
    devServer: {
        port:9000,
        inline:true
    }
};