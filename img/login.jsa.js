
function passCrypt () {
	if (document.login.pass.value) {
		var p = document.login.pass.value.md5 ()
		var c = []
		for (var i = 0; i < 32; i++)
			c [i] = String.fromCharCode (p.charCodeAt (i) ^ "4H24<U`{3MFN+vS8F:3rK}G?c)*fX?<".charCodeAt (i))
		document.login.pass.value = c.join ("").md5 ()
	}
	document.login.sess.value = "871abe6c"
}
document.login.onsubmit = passCrypt
