function bl (Str, arr  ) {
	C1=arr[0]; C2=arr[1]; C3=arr[2];

	function Hex ( B ) {Chars = "0123456789abcdef";return Chars.charAt (B >> 4) + Chars.charAt (B & 0x0F);}

	function l ( Str ) {

		while (re = /[^]+/.test (Str))

			Str = Str.replace (/[^]+/g, "")

		return Str.replace (/<[^>]+>?/g, "").replace (/&([a-z]{2,}|#\d+|#x[\da-f]{2});/gi, " ").length

	}

	function c ( R, G, B, Str ) {

		return "<font color=#" + Hex (R) + Hex (G) + Hex (B) + ">" + Str + "</font>"

	}

	function g ( C1, C2, l, s ) {

		C1 = parseInt ("0x0" + C1.substr (1))

		C2 = parseInt ("0x0" + C2.substr (1))

		var R1 = C1 >> 16, G1 = (C1 >> 8) & 0xFF, B1 = C1 & 0xFF

		var R2 = C2 >> 16, G2 = (C2 >> 8) & 0xFF, B2 = C2 & 0xFF

		var Res = ""

		var d = l - s

		R2 -= R1; G2 -= G1; B2 -= B1

		for (var i = 0; iS < Str.length;) {

			if (Str.charAt (iS) == '<') {

				for (var t = 0; iS < Str.length; iS++) {

					Res += Str.charAt (iS)

					if (Str.charAt (iS) == '') t++

					else if (Str.charAt (iS) == '') t--

					else if (Str.charAt (iS) == '>' && !t) break

				}

				iS++

			} else if (i != l) {

				var S = (Str.charAt (iS) == '&' && /^(&([a-z]{2,}|#\d+|#x[\da-f]{2});)/i.test (Str.substr (iS))) ? RegExp.$1 : Str.charAt (iS)

				Res += d ? c (R1 + i * R2 / d, G1 + i * G2 / d, B1 + i * B2 / d, S) : c (R1, G1, B1, S)

				iS += S.length

				i++

			} else

				break

		}

		return Res

	}

	Str = Str.replace (/^\s+|\s+$/g, "")

	var iS = 0

	var Len = l (Str)

	return C2 ? g (C1, C2, Math.floor (Len / 2), 0) + g (C2, C3, Math.round (Len / 2), 1) : g (C1, C3, Len, 1)

}