(function(){
   window.PageNav = PageNav;
   function PageNav(params){
        this.$box = $("#" + params.boxid);
        this.page = params.page || 1;
        this.pageAmount = params.pageAmount;
        this.flag = false;
 
        //取得事件的委托函数；
        this.fn = params.change;
        this.init();
        this.gotoPage(this.page);
        this.bindEvent();
   };
   PageNav.prototype.init = function(){
        this.$prevBtn = $("<a href='javascript:;'></a>").addClass("cBtn").html("上一页").appendTo(this.$box);
        this.$btn1 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$ellipsis1 = $("<a href='javascript:;'></a>").addClass("ellipsis").html("...").appendTo(this.$box);
        this.$btn2 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn3 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn4 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn5 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$btn6 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$ellipsis2 = $("<a href='javascript:;'></a>").addClass("ellipsis").html("...").appendTo(this.$box);
        this.$btn7 = $("<a href='javascript:;'></a>").addClass("Btn").appendTo(this.$box);
        this.$nextBtn = $("<a href='javascript:;'></a>").addClass("cBtn").html("下一页").appendTo(this.$box);
   };
   PageNav.prototype.gotoPage = function(number){
        //修正number，再传递给 this.page；
         if(number >= 1 && number <= this.pageAmount){
            this.page = number;
        };
        if(this.pageAmount <= 7){
            //隐藏两边的省略号
            this.$ellipsis1.hide();
            this.$ellipsis2.hide();
            //对上一页和下一页隐藏
            if(this.page == 1){
                this.$prevBtn.hide();
                this.$nextBtn.show();
            }else if( this.page == this.pageAmount){
                this.$prevBtn.show();
                this.$nextBtn.hide();
            }else{
                this.$prevBtn.show();
                this.$nextBtn.show();
            };
            //把现在所显示7个普通按钮选择性显示和隐藏
            this.$box.find(".Btn:lt("+this.pageAmount+")").show();
            this.$box.find(".Btn:gt("+(this.pageAmount - 1)+")").hide();
            this.$btn1.html(1).attr("data-number",1);
            this.$btn2.html(2).attr("data-number",2);
            this.$btn3.html(3).attr("data-number",3);
            this.$btn4.html(4).attr("data-number",4);
            this.$btn5.html(5).attr("data-number",5);
            this.$btn6.html(6).attr("data-number",6);
            this.$btn7.html(7).attr("data-number",7);
            //给当前的页码加cur；
            this.$box.find(".Btn").eq(this.page-1).addClass("cur").siblings(".Btn").removeClass('cur');
        }else if( this.page < 5 ){
            // 让第一个省略号显示
             this.$ellipsis1.hide();
             this.$ellipsis2.show();
             //改变每一个普通的按钮的html内容
             this.$btn1.show().html(1).attr("data-number",1);
             this.$btn2.show().html(2).attr("data-number",2);
             this.$btn3.show().html(3).attr("data-number",3);
             this.$btn4.show().html(4).attr("data-number",4);
             this.$btn5.show().html(5).attr("data-number",5);
             this.$btn6.show().html(6).attr("data-number",6);
             this.$btn7.show().html(this.pageAmount).attr("data-number",this.pageAmount);
             //给普通股按钮加cur
             this.$box.find(".Btn").eq(this.page-1).addClass("cur").siblings(".Btn").removeClass('cur');;
             //对上一页和下一页隐藏
             if( this.page == 1){
                this.$prevBtn.hide();
                this.$nextBtn.show();
             }else{
                this.$prevBtn.show();
                this.$nextBtn.show();
             };
        }else if( this.page <= this.pageAmount - 4 ){
            // 让第一个省略号显示
             this.$ellipsis1.show();
             this.$ellipsis2.show();
             //改变每一个普通的按钮的html内容
             this.$btn1.show().html(1).attr("data-number",1);
             this.$btn2.show().html(this.page-2).attr("data-number",this.page-2);
             this.$btn3.show().html(this.page-1).attr("data-number",this.page-1);
             this.$btn4.show().html(this.page).attr("data-number",this.page);
             this.$btn5.show().html(this.page+1).attr("data-number",this.page+1);
             this.$btn6.show().html(this.page+2).attr("data-number",this.page+2);
             this.$btn7.show().html(this.pageAmount).attr("data-number",this.pageAmount);
            //对上一页和下一页隐藏
            this.$prevBtn.show();
            this.$nextBtn.show();
            //给普通按钮加cur
            this.$box.find(".Btn").eq(3).addClass("cur").siblings(".Btn").removeClass('cur');;
        }else{
            // 让第一个省略号显示
             this.$ellipsis1.show();
             this.$ellipsis2.hide();
             //改变每一个普通的按钮的html内容
             this.$btn1.show().html(1).attr("data-number",1);
             this.$btn2.hide();
             this.$btn3.html(this.pageAmount-4).attr("data-number",this.pageAmount-4);
             this.$btn4.html(this.pageAmount-3).attr("data-number",this.pageAmount-3);
             this.$btn5.html(this.pageAmount-2).attr("data-number",this.pageAmount-2);
             this.$btn6.html(this.pageAmount-1).attr("data-number",this.pageAmount-1);
             this.$btn7.html(this.pageAmount).attr("data-number",this.pageAmount);
             //给普通按钮加cur
             this.$box.find(".Btn").eq(this.page-this.pageAmount-1).addClass('cur').siblings(".Btn").removeClass('cur');;
             //对上一页和下一页隐藏
             if(this.page == this.pageAmount){
                this.$prevBtn.show();
                this.$nextBtn.hide();
             }else{
                this.$prevBtn.show();
                this.$nextBtn.show();
             }
        };
        //if的意思是等页面请求后在渲染到哦页面在置为this.flag=true；执行事件委托函数；
        if(this.flag){
            this.fn(this.page);
        };
        this.flag = true;

      
   };
   PageNav.prototype.bindEvent = function(){
    var self = this;
        $(".Btn").click(function(){
            var i = parseInt($(this).attr("data-number"));
                self.gotoPage(i);
        });
        this.$prevBtn.click(function(){
            var i = self.page - 1;
            self.gotoPage(i);
        });
        this.$nextBtn.click(function(){
            var i = self.page + 1;
            self.gotoPage(i);
        });
   };
})();