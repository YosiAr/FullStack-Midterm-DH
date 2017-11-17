/**
 * ----------------------------------------------------------------------------------
 * ---ANGULAR DIRECTIVE--------------------------------------------------------------
 * simple, restrict, templateUrl, get scope options, isolated scope, link------------
 * ----------------------------------------------------------------------------------
 * https://www.slideshare.net/EyalV/angularjs-directives
 * /


/**
 * 1---------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------
 */
(function () {

    var myModule = angular.module('myDietHelper', ["ngRoute"]);
    myModule.config(function($routeProvider) {
    $routeProvider
      .when("/", {
          templateUrl : "/template/main.html"
      })
      .when("/register", {
          templateUrl : "/template/register.html"
      })
      .when("/FoodBrowser", {
          templateUrl : "template/food.html"
      })
      .when("/Save", {
          templateUrl : "template/save.html"
      })      
	  .when("/Macros", {
          templateUrl : "template/macros.html"
      }) 
	  .when("/History", {
          templateUrl : "template/history.html"
      })
	  .when("/loadProfile", {
          templateUrl : "template/loadprofile.html"
      });
    });
	myModule.factory('server', ['$http', function ($http) {
        return {
          login : function() {
	
//			"$http.get('https://jsonplaceholder.typicode.com/users/')";
		   this.profile = [
             {name: 'yossi', gender: 'Man',age : 37,height : 168,weight : 85,fat : 20,activity :  'Sedentary',lastDate: "20170812",goal : {}, macros : {},formula : true,sport : {},food : [{name : 'salmon',weight : 192,prot : 14,carb:28,fat:8,calorie:280}]},
             {name: 'naama', gender: 'Woman',age : 37,height : 168,weight : 85,neck : 50,waist : 96,hip : 92,activity : 'Sedentary',lastDate: "20170821",goal : {}, macros : {},formula : false},
             {name: 'arie', city: 'haifa',lastDate: "20160903"},
             {name: 'tom', city: 'tveria',lastDate: "20171003"}
           ];
		   this.loggedIn = 1;
          },
		 save : function() {
			  
              for(i=0;i<this.profile.length;i++){
                  if(this.current.name === this.profile[i].name){
                      alert('such profile name already exist');
                      return 0;
                  }
              }
			  var d = new Date();
              this.current.lastDate = ""+d.getFullYear()+(d.getMonth()+1)+d.getDate();
			  this.profile.push(this.current);
		 },
		 logout : function() {
            
			  this.password = null;
			  this.current = {};
			  this.profile = null;
			  this.loggedIn = 0;
		 }	
		};
    }]);
	myModule.factory("user",function(){
        return {
			 current  : { 
                          goal : {},
                          macros : {},
                          sport : 0,
                          food : []
                        },
		        food  : {
                          myFood : [],
					      myRecipe: {}
                        },
	    macrosHistory : {
		                  current : [],
			              archive : []
		                },
			 myMethod : function (callback) {
                          callback();
                        }
		};
    });
    myModule.factory("utility",['$timeout','$location',function($timeout,$location,){
        return {
           macrosPage : 1,  
           hamburgerState : 2,  
		calculate_Fat : function (){
	                     if((!this.current.fat)&&(this.current.gender==='Man')&&(this.current.neck)&&(this.current.waist)&&    (this.current.height)){
		    	              this.current.fat=495/(1.0324-0.19077*Math.log10(this.current.waist-    this.current.neck)+0.15456*Math.log10(this.current.height))-450;
		    		          this.current.fat=this.current.fat.toFixed(2)*1;
		    	          }
		    	          if((!this.current.fat)&&(this.current.gender==='Woman')&&(this.current.neck)&&(this.current.waist)&&    (this.current.hip)&&(this.current.height)){
		    	              this.current.fat=495/(1.29579-0.35004*Math.log10(this.current.waist+this.current.hip-this.current.neck)+0.22100*Math.log10(this.current.height))-450;
		    		          this.current.fat=this.current.fat.toFixed(2)*1;
		    	         }
                        },	
			 my_Alert : function (myStrHtml,count,scope) {
                         var counter = 0;
                         var myalertelem=document.getElementById("myAlert");
				         var ta = document.getElementsByClassName(myStrHtml);
						 if(ta.length!=0){
							  return 0;
						 }
                         var node = document.createElement("P");
                         myalertelem.insertBefore(node,myalertelem.childNodes[0]);
                         myalertelem.children[0].innerHTML = myStrHtml; 
                         if(typeof(count) === 'number'){
						   myalertelem.children[0].setAttribute("class",myStrHtml); 
                           $timeout(function(){
                             var ta = document.getElementsByClassName(myStrHtml)[0];   
				             ta.parentNode.removeChild(ta);
		    	             }, count);
                         }
                         if(typeof(count) === 'string'){
                           myalertelem.children[0].setAttribute("class",myStrHtml); 
                           var arg=scope.$watch(count, function(newVal, oldVal){
                                   if(counter>0){    
                                       var ta = document.getElementsByClassName(myStrHtml);   
                                       for(var i=0;i<ta.length;i++){
                                              ta[i].parentNode.removeChild(ta[i]);  
                                       }
                                      
                                       arg();
                                    }
                                   counter++;  
                                  }, true); 
                           
                         }
                        },
			my_Move : function(destination){
				           $location.path(destination);
			          },
     my_BMR_Mifflin : function(){
		                if(this.current.formula){
                              return 0; 
                           }  
                        var s;   
                        var result;
                        if(this.current.weight && this.current.age &&  this.current.height &&  this.current.gender){
				           if(this.current.gender=='Man'){
                               s = 5;
                           }  
                           if(this.current.gender=='Woman'){
                               s = -161;
                           }
                           result = (10*this.current.weight+6.25*this.current.height-5*this.current.age+s);
                           result.toFixed(0); 
						   this.current.macros.bmr = result; 	
                        }
			          },    
    my_BMR_McArdle : function(){
		                if(!this.current.formula){
                              return 0; 
                        }  
                        var lbm;
                        var result;
                        if(this.current.weight && this.current.fat){
				           lbm =  this.current.weight*(100-this.current.fat)/100;
                           result = (370+(21.6*lbm));
                           result=result.toFixed(0); 
                           this.current.macros.bmr = result; 
                        }
			          }
		};
    }]);
	myModule.factory("help",function(){
        return {
		   help : {	
                  helpFatFormula : "You can enter your body fat percentage directly, \nor enter mesurements for \nNeck,Waist and Hip(for Woman), \nthen we roughly calculate it for you.",
			   	  helpUseFatFormula : "Lean mass formula,give better results for macros calculation,but require daily to enter,not only weight,but also % fat(or mesurements).",
                  helpFatNeck : "Measure the circumference of your neck starting below the larynx, with the tape sloping downward to the front. You should avoid flaring your neck outwards.",
	              helpFatWaist : "Measure the circumference of your waist at a horizontal level around the navel for men, and at the level with the smallest width for women.Do not pull stomach inwards to obtain accurate measurements.",
		          helpFatHip : "Measure the circumference of your hips at the largest horizontal measure.",
                  helpSedentary : "Spend Most Of The Day Sitting (Bank Teller, Desk Job)",
	              helpLightActivity : "Spend A Good Part Of The Day On Your Feet (Teacher, Salesman)",
		          helpActive : "Spend A Good Part Of The Day Doing Physical Activity (Waitress, Mailman)",
	              helpVeryActive : "Spend Most Of The Day Doing Heavy Physical Activity (Messanger, Capenter)",
		          helpRegularSport : "Select this only if you do and intend to continue such activity EVERY week.You can always add irregular activity later if you want",
		          helpWorkoutDays : "Days Per Week Exercising",
		          helpDuration : "Minutes Per Day Exercising (Including Cardio)?",
		          helpLightExercise : "I Can Hold A Conversation While Working Out And Do Not Break A Sweat",
		          helpModerateExercise : "I Am Breathing Very Hard And Challenge Myself",
		          helpDifficultExercise : "Always Break A Sweat & Have An Elevated Heart Rate. I Cannot Hold A Conversation",
		          helpIntenseExercise : "Don't Talk To Me, Don't Look At Me. I'm Here For A Purpose And I Might Die Today.", 
			      helpBMR : "Basal metabolic rate (BMR) is the amount of energy expended while at rest.",  
			      helpfreeCal : "Calories that remain in daily ration after recomended minimum requirments of Protein,Fat and Carbohydrate was met.",
		          helpEmail : "You don't have to use actual e-mail, we also don't ask to confirm e-mail(so Name@FamiliName.me works),unless another person try to register with same e-mail"
		  },
		  error : ["Please select Gender",
				   "Please enter Age",
				   "Please enter Height",
				   "Please enter Weight",
				   "Please fill body Mesurements or Fat %",
				   "Please select Activity Level",
                   "Please Load or Create Profile"
			      ]	
		};
    });
	myModule.factory("data",function(){
       return {
			lmodule : {
				         headerCreateP : "Create\nProfile" ,
				         headerEditP : "Edit\nProfile",
			             headerSaveP : "Save\nProfile",
			             headerMacros : "Daily\nMacros",
                         headerSport : "Sport\nActivity",
                         headerGoal : "Progress to\nGoal",
                         useFormulaFat : "Use Lean Body Mass Formula",
                         remain : "Remain",
                         topicMacroNut : "Please Enter Macronutrients for 100gr of Product",
				         return : "Return",
				         addProd : "Add Product",
				         spend : "Spent",
				         bcancel : "Cancel",
				         product : "Product",
				         topicGender : "Choose Profile Gender",
				         bNewDay : "New Day",
				         quoteboxText : " So...\nWhat do you want to do with your flesh?",
				         man : "Man",
                         progress : "Progress",
                         balance : "Balance",
				         woman : "Woman",
				         topicAge : "Enter Age",
				         freeCal : "Flexible part of Macros",
				         years : "years",
				         topicReqMin : "Minimum Recomended Daily Intake",
				         calorie : "Calories",
				         topicHeight : "Enter Height",
				         topicChoosePN : "Choose Profile Name",
				         topicWeight : "Enter Weight",
				         topicValues : "Choose values to enter",
				         topicSport : "Sport Activity Today", 
				         cm : "cm",
				         bmr : "BMR",
				         lastUpd : "last updated",
				         kg : "kg",
				         add : "Add",
				         neck : "Neck",
				         waist : "Waist",
				         hip : "Hip",
				         or : "Or",
                         save : "Save",
				         carb : "Carbohydrate",
				         prot : "Protein",
				         fat : "Fat",
				         gr : "gr",
                         sport : "Sport",
                         email : "E-mail",
				         topicFat : "Enter Body Fat",
				         topicActivity : "Regular Daily Activity",
			         	 to : "to",
                         manage : "Manage",
                         load : "Load",
                         login : "Login",
                         profiles : "Profiles",
				         topicYourProfiles : "Your Profiles",
				         sedentary : "Sedentary",
				         maintain : "Maintain",
				         gain : "Gain",
				         lose : "Lose",
                         password : "Password",
				         lightActivity : "Light Activity",
				         active : "Active",
				         veryActive : "Very Active",
				         bSave : "Save Profile",
				         macros : "Macros",
				         hello : "Hello",
				         loggedI : "logged in as ",
				         guest : "Guest",
				         daily : "Daily",
				         mr: "mr. ",
				         ms: "ms. ",
				         yes: "Yes",
				         weight : "weight",
				         no: "No",
				         amount : "Amount",
				         menuPL : "Load Profile",
				         menuCP : "Create Profile",
				         menuRB : "Recipe Book",
				         menuIL : "Ingredients List",
				         menuEP : "Edit Profile",
				         menuMM : "My Macros",
				         menuMH : "My History",
		               },
			menu : {
			             menu1 : "Load Profile",
			             menu2 : "Create Profile",
			             menu3 : "Recipe Book",
			             menu4 : "Ingredients List",
			             menu5 : "My Macros",
		               },
		   food :  [],
         recipe :  {},
 currentProdVal :  {}
		};
    });
	myModule.factory("helpEn",function(){
        return {
				//tooltips text
		  help : {  
			        helpFatFormula : "You can enter your body fat percentage directly, \nor enter mesurements for \nNeck,Waist and Hip(for Woman), \nthen we roughly calculate it for you.",
			  	    helpUseFatFormula : "Lean mass formula,give better results for macros calculation,but require daily to enter,not only weight,but also % fat(or mesurements).",
                    helpFatNeck : "Measure the circumference of your neck starting below the larynx, with the tape sloping downward to the front. You should avoid flaring your neck outwards.",
	                helpFatWaist : "Measure the circumference of your waist at a horizontal level around the navel for men, and at the level with the smallest width for women.Do not pull stomach inwards to obtain accurate measurements.",
		            helpFatHip : "Measure the circumference of your hips at the largest horizontal measure.",
                    helpSedentary : "Spend Most Of The Day Sitting (Bank Teller, Desk Job)",
	                helpLightActivity : "Spend A Good Part Of The Day On Your Feet (Teacher, Salesman)",
		            helpActive : "Spend A Good Part Of The Day Doing Physical Activity (Waitress, Mailman)",
	                helpVeryActive : "Spend Most Of The Day Doing Heavy Physical Activity (Messanger, Capenter)",
		            helpRegularSport : "Select this only if you do and intend to continue such activity EVERY week.You can always add irregular activity later if you want",
		            helpWorkoutDays : "Days Per Week Exercising",
		            helpDuration : "Minutes Per Day Exercising (Including Cardio)?",
		            helpLightExercise : "I Can Hold A Conversation While Working Out And Do Not Break A Sweat",
		            helpModerateExercise : "I Am Breathing Very Hard And Challenge Myself",
		            helpDifficultExercise : "Always Break A Sweat & Have An Elevated Heart Rate. I Cannot Hold A Conversation",
		            helpIntenseExercise : "Don't Talk To Me, Don't Look At Me. I'm Here For A Purpose And I Might Die Today.",
			        helpBMR : "Basal metabolic rate (BMR) is the amount of energy expended while at rest.",
			        helpfreeCal : "Calories that remain in daily ration after recomended minimum requirments of Protein,Fat and Carbohydrate was met.",
		            helpEmail : "You don't have to use actual e-mail, we also don't ask to confirm e-mail(so Name@FamiliName.me works),unless another person try to register with same e-mail"
		         },
		  error : ["Please select Gender",
				   "Please enter Age",
				   "Please enter Height",
				   "Please enter Weight",
				   "Please fill body Mesurements or Fat %",
				   "Please select Activity Level",
				   "Please Load or Create Profile"
			      ]
		};
    });
	myModule.factory("dataEn",function(){
        return {
			lmodule : {
				         headerCreateP : "Create\nProfile" ,
			             headerEditP : "Edit\nProfile",
                         headerSaveP : "Save\nProfile",
                         headerMacros : "Daily\nMacros",
                         headerSport : "Sport\nActivity",
                         headerGoal : "Progress to\nGoal",
				         topicSport : "Sport Activity Today", 
				         useFormulaFat : "Use Lean Body Mass Formula",
				         return : "Return",
				         topicGender : "Choose Profile Gender",
				         man : "Man",
				         progress : "Progress",
				         woman : "Woman",
				         topicAge : "Enter Age",
				         spend : "Spent",
				         email : "E-mail",
				         years : "years",
				         remain : "Remain",
				         lastUpd : "last updated",
				         balance : "Balance",
				         product : "Product",
				         addProd : "Add Product",
				         bcancel : "Cancel",
				         topicReqMin : "Minimum Recomended Daily Intake",
				         calorie : "Calories",
				         topicHeight : "Enter Height",
				         topicWeight : "Enter Weight",
				         topicValues : "Choose values to enter",
				         to : "to",
				         cm : "cm",
				         bmr : "BMR",
				         kg : "kg",
				         topicMacroNut : "Please Enter Macronutrients for 100gr of Product",
				         quoteboxText : " So...\nWhat do you want to do with your flesh?",
                         manage : "Manage",
                         load : "Load",
                         profiles : "Profiles",
				         neck : "Neck",
				         waist : "Waist",
				         hip : "Hip",
				         or : "Or",
				         add : "Add",
				         carb : "Carbohydrate",
				         prot : "Protein",
				         fat : "Fat",
				         gr : "гр",
				         save : "Save",
                         sport : "Sport",
				         topicFat : "Enter Body Fat",
				         topicActivity : "Regular Daily Activity",
                         topicYourProfiles : "Your Profiles",
                         manage : "Manage",
                         load : "Load",
				         freeCal : "Flexible part of Macros",
                         login : "Login",
                         profiles : "Profiles",
                         topicChoosePN : "Choose Profile Name",
				         sedentary : "Sedentary",
						 maintain : "Maintain",
				         gain : "Gain",
				         lose : "Lose",
				         amount : "Amount",
				         daily : "Daily",
				         password : "Password",
				         lightActivity : "Light Activity",
				         active : "Active",
				         veryActive : "Very Active",
				         bSave : "Save Profile",
				         macros : "Macros",
				         hello : "Hello",
				         loggedI : "logged in as ",
				         guest : "Guest",
				         mr: "mr. ",
				         ms: "ms. ",
				         weight : "weight",
				         yes: "Yes",
				         no: "No",
				         bNewDay : "New Day",
				         menuPL : "Load Profile",
				         menuCP : "Create Profile",
				         menuRB : "Recipe Book",
				         menuIL : "Ingredients List",
				         menuEP : "Edit Profile",
				         menuMM : "My Macros",
				         menuMH : "My History",
		               },
			menu : {
			             menu1 : "Load Profile",
			             menu2 : "Create Profile",
			             menu3 : "Recipe Book",
			             menu4 : "Ingredients List",
			             menu5 : "My Macros",
		               }
		};
    });
	myModule.factory("helpRus",function(){
        return {//tooltips text
	      help :  {
			        helpFatFormula : "Вы можете ввести процент жира напрямую или ввести обхват шеи, талии и бедер (для женщины),тогда мы грубо подсчитаем его для вас.",
			        helpUseFatFormula : "Формула сухой массы дает более точные результаты для расчета макроса,но требует каждый день кроме веса вводить % жира(или размеры).",
                    helpFatNeck : "Обхват шеи,нужно измерить в месте чуть ниже гортани, при этом лента/сантиметр должна быть наклонена вниз-вперед. Вам не следует напрягать шею.",
	                helpFatWaist : "Измеряйте окружность талии на уровне пупка для мужчин и на уровне с наименьшей шириной для женщин.Чтобы получить точные измерения,не втягивайте живот.",
		            helpFatHip : "Измеряйте окружность бедер там где они шире всего.",
                    helpSedentary : "Проведите большую часть дня сидя (банковский клерк,или другая сидячая работа)",
	                helpLightActivity : "Проведите значительную часть дня на ногах (учитель, продавец)",
		            helpActive : "Проведите значительную часть дня, занимаясь физической деятельностью (официантка, почтальон)",
	                helpVeryActive : "Проведите большую часть дня, занимаясь тяжелой физической деятельностью (плотник,строитель)",
		            helpRegularSport : "Выберите это только в том случае, если вы это делаете и намереваетесь продолжить такую деятельность КАЖДУю неделе. Вы можете всегда добавить нерегулярную активность позже, если хотите",
		            helpWorkoutDays : "Сколько раз в неделю Вы занимаетесь",
		            helpDuration : "Минут в день на спорт (включая кардио)?",
		            helpLightExercise : "Я могу разговаривать во время тренировки и не вспотеть",
		            helpModerateExercise : "Я очень сильно дышу и испытываю себя на тренировке",
		            helpDifficultExercise : "Всегда потею и повышен пульс. Я не могу вести разговор",
		            helpIntenseExercise : "Не говори со мной, не смотри на меня. Я здесь для достижения цели, и я могу умереть сегодня.",
			        helpBMR : "Основной обмен, Базальный метаболизм (Basal Metabolism) — минимальное количество энергии, расходуемое человеческим организмом для поддержания собственной жизни в покое.", 
			        helpfreeCal : "Кол-во калорий остающееся в дневном рационе после вычета минимально рекомендованных Белков,Жиров и Углеводов.",
		            helpEmail : "Вам не нужно использовать фактический адрес электронной почты, мы также не попросим его подтвердить(так что Имя@Фамилия.я вполне вариант),пока другое лицо не попытается зарегистрироваться с тем же адресом электронной почты"
		          },
		  error : ["Пожалуйста выберите Gender",
				   "Пожалуйста заполните поле Возраст",
				   "Пожалуйста заполните поле Рост",
				   "Пожалуйста заполните поле Вес",
				   "Пожалуйста введите замеры тела,или % Жира",
				   "Пожалуйста выберите Activity Level",
                   "Пожалуйста Создайте или Загрузите Профиль"
			      ]
		};
    });
    myModule.factory("dataRus",function(){
        return {
			lmodule : {
				         headerCreateP : "Создать\nПрофиль" ,
			             headerEditP : "Изменить\nПрофиль",
                         headerSaveP : "Сохранить\nПрофиль",
                         headerMacros : "Дневной\nМакрос",
                         headerSport : "Спортивная\nАктивность",
                         topicSportCal : "Спортивная\nАктивность",
                         headerGoal : "Прогресс на пути\nк Цели",
				         useFormulaFat : "Использовать Формулу Сухой Массы",
				         return : "Вернутся",
				         topicSport : "Спортивная Активность Сегодня", 
				         topicGender : "Выберите Пол Профиля",
				         man : "Мужской",
				         bmr : "БСМ",
                         progress : "Прогресс",
				         woman : "Женский",
				         topicReqMin : "Минимальное Рекомендуемое Ежедневное Потребление",
				         topicAge : "Введите Возраст",
				         years : "лет",
				         spend : "Потрачено",
				         topicWeight : "Введите Вес",
				         topicHeight : "Введите Рост",
				         topicValues : "Выберите данные для ввода",
				         remain : "Остаток",
				         to : "чтобы",
                         topicChoosePN : "Выберите имя для Профиля",
			             product : "Еду",
			             amount : "Кол-во",
                         email : "E-mail",
                         manage : "Изменить",
				         calorie : "Калории",
				         weight : "вес",
                         load : "Загрузить",
                         login : "Войти",
                         profiles : "Профиль",
                         password : "Пароль   ",
				         cm : "см",
				         add : "Добавить",
				         addProd : "Добавить Продукт",
				         bcancel : "Отмена",
				         kg : "кг",
				         gr : "гр",
				         lastUpd : "изменен",
				         freeCal : "Гибкая часть Макроса",
				         quoteboxText : "Итак ...\n Что вы хотите делать с вашим весом?",
				         neck : "Шея",
				         waist : "Талия",
				         topicMacroNut : "Пожалуйста, введите  Макронутриенты для 100гр продукта",
				         balance : "Всего",
				         hip : "Бедра",
				         or : "Или",
				         daily : "Ежедневные",
                         save : "Сохранить",
                         sport : "Спорт",
						 maintain : "Поддержать",
				         gain : "Набрать",
				         prot : "Белки",
				         carb : "Углеводы",
				         fat : "Жиры",
				         lose : "Потерять",
				         topicFat : "Введите Процент Жира",
				         topicActivity : "Выберите образ жизни",
				         sedentary : "Сидячий",
				         lightActivity : "Легкая Активность",
				         active : "Нормальная Активность",
				         veryActive : "Очень Активный",
				         bSave : "Сохранить Профиль",
				         macros : "Макрос",
                         topicYourProfiles : "Ваши Профили",
				         hello : "Здравствуйте",
				         loggedI : "Вы зашли как ",
				         guest : "Гость",
				         mr: "",
				         ms: "",
				         yes: "Да",
				         no: "Нет",
				         bNewDay : "Новый день",
				         menuPL : "Загрузить Профиль",
				         menuCP : "Создать Профиль",
				         menuRB : "Книга Рецептов",
				         menuIL : "Список Ингредиентов",
				         menuEP : "Изменить Профиль",
			           	 menuMM : "Мой Макрос",
			         	 menuMH : "Моя История",
		               },
			menu : {
			             menu1 : "Загрузить Профиль",
			             menu2 : "Создать Профиль",
			             menu3 : "Книга Рецептов",
			             menu4 : "Список Ингредиентов",
			             menu5 : "Мой Макрос",
		               }
		};
    });

	
    myModule.directive('myfooter', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myfooter.html'
        }
    });
	myModule.directive('myquestionbox', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myquestionbox.html'
        }
    });	
	myModule.directive('myhamburger', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myhamburger.html'
        }
    });	
	myModule.directive('myworkout', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myworkout.html'
        }
    });
//	myModule.directive('myworkoutcalc', function () {
//        
//        return {
//			scope: true,
//            templateUrl: '/template/myworkoutcalc.html'
//        }
//    });
	myModule.directive('myregularsport', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myworkout.html'
        }
    });	
    myModule.directive('mymacros', function () {
        
        return {
			scope: true,
            templateUrl: '/template/mymacros.html'
        }
    });    
	myModule.directive('myfat', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myfat.html'
        }
    });
	myModule.directive('mylanguagebox', function () {
        
        return {
			scope: true,
            templateUrl: '/template/languagebox.html'
        }
    });
	myModule.directive('myweight', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myweight.html'
        }
    });
	myModule.directive('mypagemacros', function () {
        
        return {
			scope: true,
            templateUrl: '/template/mypagemacros.html'
        }
    });	
	myModule.directive('mypagesport', function () {
        
        return {
			scope: true,
            templateUrl: '/template/mypagesport.html'
        }
    });	
	myModule.directive('mypageprogress', function () {
        
        return {
			scope: true,
            templateUrl: '/template/mypageprogress.html'
        }
    });
	myModule.directive('mygreeting', function () {
        
        return {
			scope: true,
            templateUrl: '/template/mygreeting.html'
        }
    }); 
	myModule.directive('mymenubox', function () {
        
        return {
			scope: true,
            templateUrl: '/template/mymenubox.html'
        }
    }); 
    myModule.directive('myprofile', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myprofile.html'
        }
    });  
    myModule.directive('myprofileload', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myprofileload.html'
        }
    });    
    myModule.directive('myprofilesave', function () {
        
        return {
			scope: true,
            templateUrl: '/template/myprofilesave.html'
        }
    });
	myModule.controller('dhUserController', ['$scope','user','data','help','server','$timeout','utility',function($scope,user,data,help,server,$timeout,utility )
	{
		$scope.server = server;
		$scope.data = data;
		$scope.help = help;
		$scope.user = user;	
        $scope.utility = utility;
		//on what page we are
        $scope.data.menu1 = data.menu.menu1;
		$scope.data.menu2 = data.menu.menu2;
		$scope.data.menu3 = data.menu.menu3;
		$scope.data.menu4 = data.menu.menu4;
		$scope.data.menu5 = data.menu.menu5;
		//change create profile to edit profile if gender entered
        $scope.set_Gender = function (gender){
           $scope.user.current.gender = gender;
		   $scope.data.profile = true;
		   $scope.data.menu.menu2 = data.lmodule.menuEP;
		   $scope.data.menu2 = data.menu.menu2;
        }        
		$scope.set_LBM_Formula = function (form){
          $scope.user.current.formula = form;
        }
		$scope.set_Daily_Activity = function (activity){
          $scope.user.current.activity = activity;
        }
		$scope.set_sport_Days = function (sportDays){
          $scope.user.current.sportDays = sportDays;
        }
		$scope.set_sport_Days_Weekly = function (sportWeekly){
          $scope.user.current.sportWeekly = sportWeekly;
		}		
		$scope.set_Workout_Intencity = function (workoutI){
		  $scope.user.current.workoutI = workoutI;
		}	
        $scope.profile_Validate = function (destination){
			var error = 1;
            if(!user.current.gender){
                 $scope.utility.my_Alert(help.error[0],"user.current.gender",$scope);
			     error=0;
			} 
			if(!user.current.age){
                 $scope.utility.my_Alert(help.error[1],"user.current.age",$scope);
			     error=0;
			}
			
			if(!user.current.height){
                 $scope.utility.my_Alert(help.error[2],"user.current.height",$scope);
			     error=0;
			}
			if(!user.current.weight){
                 $scope.utility.my_Alert(help.error[3],"user.current.weight",$scope);
			     error=0;
			}
			$scope.user.myMethod(utility.calculate_Fat.bind(user));
			if(user.current.formula){
			   if(!user.current.fat){	
                   $scope.utility.my_Alert(help.error[4],"user.current.fat",$scope);
			       error=0;
			   }
			}
			if(!user.current.activity){	
                 $scope.utility.my_Alert(help.error[5],"user.current.activity",$scope);
			     error=0;
			}
            if(error){$timeout(function(){
				       $scope.utility.my_Move(destination); 
			         }, 0);
			}
        }		
		
    }])
	myModule.controller('dhUserLoadController', ['$scope','user','data','help','server','$timeout','utility',function($scope,user,data,help,server,$timeout,utility )
	{
		$scope.server = server;
		$scope.data = data;
		$scope.help = help;
		$scope.user = user;	
        $scope.utility = utility;
		$scope.user = user;
		$scope.data.menu1 = data.menu.menu1;
		$scope.data.menu2 = data.menu.menu2;
		$scope.data.menu3 = data.menu.menu3;
		$scope.data.menu4 = data.menu.menu4;
		$scope.data.menu5 = data.menu.menu5;
		$scope.logout_Current_User  = function(){
			$scope.user.myMethod(server.logout.bind(user));
			$scope.data.menu.menu2 = data.lmodule.menuCP;
		    $scope.data.menu2 = data.menu.menu2;
		}
        $scope.load_Selected_Profile = function (index){
		 $scope.user.current = JSON.parse(angular.toJson(user.profile[index]));
		 $scope.user.myMethod(utility.calculate_Fat.bind(user));
		 $scope.data.menu.menu2 = data.lmodule.menuEP;
		 $scope.data.menu2 = data.menu.menu2;
         $scope.utility.macrosPage = 1;   
		 $scope.data.profile = true;
		}	
    }])		
    myModule.controller('dhUserSaveController', ['$scope','user','data','help','server','$timeout','utility',function($scope,user,data,help,server,$timeout,utility )
	{
		$scope.server = server;
		$scope.data = data;
		$scope.help = help;
		$scope.user = user;	
        $scope.utility = utility;
        $scope.data.menu1 = data.menu.menu1;
		$scope.data.menu2 = data.menu.menu2;
		$scope.data.menu3 = data.menu.menu3;
		$scope.data.menu4 = data.menu.menu4;	
		$scope.data.menu5 = data.menu.menu5;
		$scope.user.myMethod(utility.calculate_Fat.bind(user));
        $scope.load_Selected_Profile = function (index){
		 $scope.user.current = JSON.parse(angular.toJson(user.profile[index]));
		 $scope.user.myMethod(utility.calculate_Fat.bind(user));
		 $scope.data.menu.menu2 = data.lmodule.menuEP;
		 $scope.data.menu2 = data.menu.menu2;
         $scope.utility.macrosPage = 1;       
		 $scope.data.profile = true;
		}	
    }])		
	myModule.controller('dhFoodController', ['$scope','user',function($scope,user )
	{
		$scope.user = user;
        $scope.set_Gender = function (gender){
           $scope.user.current.gender = gender;
        }        
		$scope.set_Daily_Activity = function (activity){
          $scope.user.current.activity = activity;
        }
		$scope.set_sport_Days = function (sportDays){
          $scope.user.current.sportDays = sportDays;
        }
	
    }])	
    myModule.controller('dhHamburgerController', ['$scope','data','utility',function($scope,data, utility )
	{
        $scope.data = data;
        $scope.utility = utility;
        $scope.change_Menu = function (){
          $scope.utility.hamburgerState = (utility.hamburgerState + 1) % 2;
        }
    }])			
    myModule.controller('dhMacrosController', ['$scope','data','utility',function($scope,data, utility )
	{
        $scope.data = data;
        $scope.utility = utility;
        $scope.set_Header = function (){
          switch(utility.macrosPage){
             case 1:
                  return data.lmodule.headerMacros;
             case 2:
                  return data.lmodule.headerSport;
             case 3:
                  return data.lmodule.headerGoal;
            default:
                  return data.lmodule.headerMacros;
        
          }
        }
        $scope.data.menu1 = data.menu.menu1;
		$scope.data.menu2 = data.menu.menu2;
		$scope.data.menu3 = data.menu.menu3;
		$scope.data.menu4 = data.menu.menu4;
		$scope.data.menu5 = data.menu.menu5;
    }])		 
	myModule.controller('dhMacrosCalcController', ['$scope','user','data','help','server','$timeout','utility',function($scope,user,data,help,server,$timeout,utility )
	{
		$scope.server = server;
		$scope.data = data;
		$scope.help = help;
		$scope.user = user;	
        $scope.utility = utility;
        
        $scope.calculate_BMR = function(){
		   if(user.current.formula && !user.current.fat){
			   $scope.user.current.macros.macros=0;
			   return help.error[4];
		   }	
           $scope.user.myMethod(utility.my_BMR_Mifflin.bind(user));
           $scope.user.myMethod(utility.my_BMR_McArdle.bind(user));	
		   var act;
		   switch(user.current.activity){
             case "Sedentary":
                  act=1.2;
				  break;
             case "Light Activity":
                  act=1.375;
				  break;
             case "Active":
                  act=1.55;
				  break;
			 case "Very Active":
                  act=1.725;
				  break;
            default:
                  act=0;  
           }
		   if(user.current.macros.sportToday){
                $scope.user.current.macros.macros =  (user.current.macros.bmr*act + user.current.sport);   
		   }
		   else{
			   $scope.user.current.macros.macros =  (user.current.macros.bmr*act);
		   }
		   if(user.current.goal.dirMult)     
			   $scope.user.current.macros.macros = user.current.macros.macros*user.current.goal.dirMult;
		   if(user.current.macros.macros)     
			   $scope.user.current.macros.macros = user.current.macros.macros.toFixed(0);
           if(user.current.macros.bmr){
              return data.lmodule.calorie+" "+user.current.macros.bmr+" ";  
           }
           return help.error[6]; 
        }
        $scope.calculate_minProt = function (){  
             if(user.current.weight)
             {
				if(user.current.macros.sportToday){
                       $scope.user.current.macros.minProt =(0.8*user.current.weight+user.current.sport*0.3/4).toFixed(0);
				}
				else{
					   $scope.user.current.macros.minProt = (0.8*user.current.weight).toFixed(0);
				}
                return  " "+user.current.macros.minProt+" "+data.lmodule.gr;  
             }
             return help.error[6];           
        }
        $scope.calculate_freeCal = function (){
             if(user.current.macros.macros && user.current.macros.minCarb && user.current.macros.minProt && user.current.macros.minFat )
             {
                $scope.user.current.macros.freeCal = user.current.macros.macros - user.current.macros.minCarb*4 - user.current.macros.minProt*4 - user.current.macros.minFat*9;  
                return  data.lmodule.calorie+" "+user.current.macros.freeCal+" ";  
             } 
             return help.error[6];
        }        
        $scope.calculate_minFat = function (){
             if(user.current.macros.macros)
             {
                $scope.user.current.macros.minFat = (user.current.macros.macros*0.2/9).toFixed(0);
                return " "+user.current.macros.minFat+" "+data.lmodule.gr;  
             }
             return help.error[6];
        }
        $scope.calculate_minCarb = function (){
             if(user.current.macros.macros)
             {
                $scope.user.current.macros.minCarb = (user.current.macros.macros*0.45/4).toFixed(0);
                if(user.current.macros.minCarb < 130) {
                  $scope.user.current.macros.minCarb=130;
                }  
                return  " "+user.current.macros.minCarb+" "+data.lmodule.gr;  
             }
             return help.error[6];
        }  
		$scope.delete_Item = function (id){
			var myId=0;
            for (key in user.current.food){
				if(user.current.food[key].id === id){
					myId = key;
				}
				if(user.current.food[key].id > id){
					$scope.user.current.food[key].id = user.current.food[key].id - 1;
				}
			}
			$scope.user.current.food.splice(myId,1);
			$scope.calculate_Left_Macros();
        } 
		$scope.show_Food = function (name){
			var foundItem = 0;
            for (key in data.food) { 
			   if(data.food[key].name === name){
				  foundItem=1;
				  $scope.data.myProductItem = JSON.parse(angular.toJson(data.food[key]));
			   }
			 }	 
			 for (key2 in user.food.myFood){
			   if(user.food.myFood[key2].name === name){
				   foundItem=1;
				   $scope.data.myProductItem = JSON.parse(angular.toJson(user.food.myFood[key2])); 
			   } 
			 }
			 if(foundItem){
				   $scope.data.showProductWindow = 1;
			 }
        } 	
		$scope.calculate_Left_Macros = function (){
             if(user.current.macros.macros)
             {
                $scope.user.current.macros.eatenProt = 0;
                $scope.user.current.macros.eatenCarb = 0;
                $scope.user.current.macros.eatenFat = 0;
				$scope.user.current.macros.eatenCal = 0; 
				$scope.user.current.macros.leftProt = 0;
				$scope.user.current.macros.leftCal = 0;
				$scope.user.current.macros.leftCarb = 0;
				$scope.user.current.macros.leftFat = 0;
				for (key in user.current.food){
				    $scope.user.current.macros.eatenProt+=user.current.food[key].prot*1;
					$scope.user.current.macros.eatenCarb+=user.current.food[key].carb*1;
					$scope.user.current.macros.eatenFat+=user.current.food[key].fat*1;
					$scope.user.current.macros.eatenCal+=user.current.food[key].calorie*1;
				}
				$scope.user.current.macros.eatenProt = user.current.macros.eatenProt.toFixed(1);
                $scope.user.current.macros.eatenCarb = user.current.macros.eatenCarb.toFixed(1);
                $scope.user.current.macros.eatenFat = user.current.macros.eatenFat.toFixed(1);
                $scope.user.current.macros.eatenCal = user.current.macros.eatenCal.toFixed(1);
			    $scope.user.current.macros.leftCalorie = user.current.macros.freeCal;
				if( (user.current.macros.minProt - user.current.macros.eatenProt) < 0){
					 $scope.user.current.macros.leftProt = 0;
					 $scope.user.current.macros.leftCalorie += (user.current.macros.minProt - user.current.macros.eatenProt)*4;
				}
				else{
					 $scope.user.current.macros.leftProt = user.current.macros.minProt-user.current.macros.eatenProt; 
				}
				if( (user.current.macros.minCarb-user.current.macros.eatenCarb) < 0){
					 $scope.user.current.macros.leftCarb = 0;
					 $scope.user.current.macros.leftCalorie +=  (user.current.macros.minCarb-user.current.macros.eatenCarb)*4; 
				}	
				else{
					 $scope.user.current.macros.leftCarb=user.current.macros.minCarb-user.current.macros.eatenCarb;
				}
				if( (user.current.macros.minFat-user.current.macros.eatenFat) < 0){
					 $scope.user.current.macros.leftFat = 0;
					 $scope.user.current.macros.leftCalorie += (user.current.macros.minFat-user.current.macros.eatenFat)*9;
				}
				else{
					  $scope.user.current.macros.leftFat = user.current.macros.minFat-user.current.macros.eatenFat;
				}
				$scope.user.current.macros.leftProt = user.current.macros.leftProt.toFixed(1);
				$scope.user.current.macros.leftCal = user.current.macros.leftCal.toFixed(1);
				$scope.user.current.macros.leftCarb = user.current.macros.leftCarb.toFixed(1);
				$scope.user.current.macros.leftFat = user.current.macros.leftFat.toFixed(1);
             }
        }
		$scope.add_Product_Entry = function (){
			 var foundItem = 0;
			 for (key in data.food) { 
			   if(data.food[key].name === data.product){
				   foundItem=1;
				   $scope.data.currentProdVal = JSON.parse(angular.toJson(data.food[key]));
			   }
			 }	 
			 for (key2 in user.food.myFood){
			   if(user.food.myFood[key2].name === data.product){
				   foundItem=1;
				   $scope.data.currentProdVal = JSON.parse(angular.toJson(user.food.myFood[key2])); 
			   } 
			 }
			 if(foundItem){ 
				$scope.user.current.food.push({id : user.current.food.length+1,name : data.product,weight : data.amount,prot : (data.currentProdVal.prot*data.amount/100).toFixed(1),carb :(data.currentProdVal.carb*data.amount/100).toFixed(1),fat : (data.currentProdVal.fat*data.amount/100).toFixed(1),calorie : (data.currentProdVal.calorie*data.amount/100).toFixed(1)}); 
				$scope.calculate_Left_Macros();
			 }
			 if(!foundItem){
				 $scope.data.addProductWindow = 1;
			 }
		}		
    }])	
	myModule.controller('dhNewDayController', ['$scope','data','user','utility',function($scope,data,user,utility)
	{	
		$scope.data = data;
		$scope.utility = utility;
		$scope.user = user;
		$scope.new_Day = function (){	
			if(!user.current.macros.macros){
				alert("No Macros fit entered data,fill,or load profile");
				$scope.utility.my_Move('/register');
				return 0;
			}
			if(!user.current.macros.sportToday){
				alert("Please select Sport activity(or lack of such)");
				$scope.utility.macrosPage = 2;
				return 0;
			}			
		 	$scope.user.macrosHistory.current.push(JSON.parse(angular.toJson(user.current)));
			$scope.user.current.sport=0;
			$scope.user.current.food=[]; 
			$scope.user.current.macros=(JSON.parse(angular.toJson({})));
			if(user.macrosHistory.current.length > 7){
				console.log(user.macrosHistory.current);
			}
		}		
    }])	
	myModule.controller('dhHistoryController', ['$scope','data','user','utility',function($scope,data,user,utility)
	{	
		$scope.data = data;
		$scope.utility = utility;
		$scope.user = user;	
		$scope.previous_Day = function (){	

		}		
		$scope.next_Day = function (){	

		}
    }])	
	myModule.controller('dhAddProductController', ['$scope','data','user',function($scope,data,user )
	{	
		$scope.data = data;
		$scope.user = user;
		$scope.add_Entry = function (){
			if(data.carb && data.fat && data.calorie && data.prot){
			  $scope.user.food.myFood.push({name : data.product,prot : data.prot,carb : data.carb,fat : data.fat,calorie : data.calorie});
			  $scope.data.carb = "";
			  $scope.data.fat = "";
			  $scope.data.calorie = "";
			  $scope.data.prot = "";
			  $scope.data.addProductWindow = 0;
			  return "";	
			}
			alert("enter macro values");
		}		
		$scope.cancel_Add_Entry = function (){
			 $scope.data.addProductWindow = 0;
		}
    }])	
	myModule.controller('dhMacrosSportController', ['$scope','data','utility','help','user',function($scope,data, utility,help,user )
	{
        $scope.data = data;
        $scope.help = help;
        $scope.user = user;
        $scope.utility = utility;
        $scope.set_Header = function (){
          switch(utility.macrosPage){
             case 1:
                  return data.lmodule.headerMacros;
             case 2:
                  return data.lmodule.headerSport;
             case 3:
                  return data.lmodule.headerGoal;
            default:
                  return data.lmodule.headerMacros;
        
          }
        } 
		$scope.set_Sport_Activity = function (valueBoolean){
          $scope.user.current.macros.sportToday = valueBoolean;
        }		
		$scope.delete_Sport = function (){
            $scope.user.current.sport = 0;
        }
		$scope.add_Sport_Entry = function (sport){
		 	if(typeof(sport) == 'number'){
              $scope.user.current.sport += sport;
			}
        }
		
        $scope.data.menu1 = data.menu.menu1;
		$scope.data.menu2 = data.menu.menu2;
		$scope.data.menu3 = data.menu.menu3;
		$scope.data.menu4 = data.menu.menu4;
		$scope.data.menu5 = data.menu.menu5;
    }])		 
	myModule.controller('dhMacrosProgressController', ['$scope','data','utility',function($scope,data, utility )
	{
        $scope.data = data;
        $scope.utility = utility;
        $scope.set_Header = function (){
          switch(utility.macrosPage){
             case 1:
                  return data.lmodule.headerMacros;
             case 2:
                  return data.lmodule.headerSport;
             case 3:
                  return data.lmodule.headerGoal;
            default:
                  return data.lmodule.headerMacros;
        
          }
        }
        $scope.data.menu1 = data.menu.menu1;
		$scope.data.menu2 = data.menu.menu2;
		$scope.data.menu3 = data.menu.menu3;
		$scope.data.menu4 = data.menu.menu4;
		$scope.data.menu5 = data.menu.menu5;
    }])			
	myModule.controller('dhFooterController', ['$scope','data','user',function($scope,data,user )
	{	
		$scope.data = data;
    }])		
	myModule.controller('dhGreetingController', ['$scope','user','data',function($scope,user,data )
	{  
		$scope.user = user;
		$scope.data = data;
		
    }])
	myModule.controller('dhLanguageController', ['$scope','data','help','dataEn','helpEn','dataRus','helpRus',function($scope,data,help,dataEn,helpEn,dataRus,helpRus )
	{
		$scope.data = data;
		$scope.help = help;
		$scope.dataRus = dataRus;
		$scope.helpRus = helpRus;
		$scope.dataEn = dataEn;
		$scope.helpEn = helpEn;
		$scope.set_Language = function (len){
		 $scope.help.error=JSON.parse(angular.toJson(eval("help" + len+".error")));
		 $scope.help.help=JSON.parse(angular.toJson(eval("help" + len+".help")));
		 var myalertelem=document.getElementById("myAlert");
         if(myalertelem){    
            myalertelem.innerHTML = '';
         }
		 if(data.menu.menu1){	
		    for (key in data.menu) { 
			  for (key2 in data.lmodule){
				  if (data.lmodule[key2]===data.menu[key]){
					   console.log(data.lmodule[key2]);
				  console.log(data.menu[key]);
					  $scope.data.menu[key]=eval("data" + len).lmodule[key2];
				  }
			  }
            }	
		  }
		  else{
        	$scope.data.menu=JSON.parse(angular.toJson(eval("data" + len).menu));	
		  }	
		  $scope.data.lmodule=JSON.parse(angular.toJson(eval("data" + len).lmodule));	
		  $scope.data.menu1 = data.menu.menu1;
		  $scope.data.menu2 = data.menu.menu2;
		  $scope.data.menu3 = data.menu.menu3;
		  $scope.data.menu4 = data.menu.menu4;	
		  $scope.data.menu5 = data.menu.menu5;
		  var d = document.getElementById(len);
		  d.parentNode.insertBefore(d, d.parentNode.firstChild);
        }	
    }])
	myModule.controller('dhMainController', ['$scope','data','user','server','$location','utility','help',function($scope,data,user,server,$location,utility,help)
	{
		$scope.data = data;
		$scope.user = user;
		$scope.utility = utility;
		$scope.server = server;
		$scope.help = help;
		$scope.data.menu1 = data.menu.menu1;
		$scope.data.menu2 = data.menu.menu2;
		$scope.data.menu3 = data.menu.menu3;
		$scope.data.menu4 = data.menu.menu4;
		$scope.data.menu5 = data.menu.menu5;		
    }])	
	myModule.controller('dhMenuController', ['$scope','data','user',function($scope,data,user)
	{
		$scope.data = data;
		$scope.user = user;
		$scope.set_Goal_Direction = function (direction){
          $scope.user.current.goal.direction = direction;
		   switch(user.current.goal.direction){
             case "gain":
                  $scope.user.current.goal.dirMult = 1.1;
				  break;
             case "maintain":
                  $scope.user.current.goal.dirMult = 1;
				  break;
             case "lose":
                  $scope.user.current.goal.dirMult = 0.9;
				  break;
            default:
                  break;;  
           }	
		}	
    }])
	myModule.controller('dhShowProductWindow', ['$scope','data','user',function($scope,data,user)
	{
		$scope.data = data;
		$scope.user = user;
        $scope.cancel_Show_Product = function (){
	          $scope.data.showProductWindow = 0;
		}	
    }])
})();

