timely.define("libs/captcha/recaptcha",["jquery_timely","//www.google.com/recaptcha/api/js/recaptcha_ajax.js"],function(e){var t=!1,n=function(){return"undefined"!=typeof Recaptcha},r=function(n){Recaptcha.create(n.key,n.object,{theme:"white",callback:function(){e(i(),n.captcha_object).attr("placeholder",n.placeholder),n.captcha_object.removeClass("ai1ec-initializing").addClass("ai1ec-initialized"),t=!0}}),n.captcha_object.addClass("ai1ec-initializing")},i=function(){return"#recaptcha_response_field"},s=function(t){e(i(),t).length&&n()&&Recaptcha.reload()},o=function(t){e(".ai1ec-recaptcha",t).removeClass("ai1ec-initializing ai1ec-initialized"),Recaptcha.destroy()},u=function(){if(!t)return!0;var n=e(i());return n.val().length>0};return{is_ready:n,init:r,get_field_name:i,reload:s,destroy:o,check_field:u}}),timely.define("libs/captcha/nocaptcha",["jquery_timely","//www.google.com/recaptcha/api.js"],function(e){var t=!1,n=!1,r={},i=function(){return"undefined"!=typeof grecaptcha},s=function(i){if(n)return;r=i,e(i.object).html(""),grecaptcha.render(i.object,{sitekey:i.key,theme:"white",callback:function(e){t=!0}}),n=!0},o=function(){return"#g-recaptcha-response"},u=function(e){t=!1,n=!1,s(r)},a=function(e){t=!1,n=!1},f=function(){return t};return{is_ready:i,init:s,get_field_name:o,reload:u,destroy:a,check_field:f}}),timely.define("libs/captcha/void",[],function(){var e=function(){return!1},t=function(e){},n=function(){return""},r=function(e){},i=function(e){},s=function(){return!0};return{is_ready:e,init:t,get_field_name:n,reload:r,destroy:i,check_field:s}}),timely.define("libs/captcha",["jquery_timely","libs/captcha/recaptcha","libs/captcha/nocaptcha","libs/captcha/void"],function($,$recaptcha,$nocaptcha,$void){var $provider=$void,get_provider=function(e){if("recaptcha"===e)return $recaptcha;if("nocaptcha"===e)return $nocaptcha},init_captcha=function($form){var $captcha=$(".ai1ec-captcha",$form);if($captcha.length===0)return;$provider=get_provider($captcha.data("provider"));if($captcha.data("providerConstructor")){var $callback=$captcha.data("providerConstructor");$provider=eval($callback)()}if(!$provider.is_ready()||$captcha.is(".ai1ec-initializing, .ai1ec-initialized"))return;$provider.init({key:$captcha.data("captchaKey"),object:$captcha[0],placeholder:$captcha.data("placeholder"),captcha_object:$captcha})},destroy=function(e){$provider.destroy(e)},reload=function(e){$provider.reload(e)},get_field_name=function(){return $provider.get_field_name()},check_field=function(){return $provider.check_field()};return{init_captcha:init_captcha,destroy:destroy,reload:reload,get_field_name:get_field_name,check_field:check_field}});