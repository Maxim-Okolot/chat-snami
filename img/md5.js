/*
 *  Javascript implementation of the RSA Data Security, Inc. MD5 Message-Digest Algorithm.
 *
 *  Copyright (c) 2004 by August
 *  www.august4u.ru
 *
 */


String.prototype.md5 = function () {
	function transform () {
		function bit_rol ( a, c ) { return (a << c) | (a >>> 32 - c) }
		function F ( x, y, z ) { return (x & y) | ((~x) & z) }
		function G ( x, y, z ) { return (x & z) | (y & (~z)) }
		function H ( x, y, z ) { return x ^ y ^ z }
		function I ( x, y, z ) { return y ^ (x | (~z)) }
		function FF ( a, b, c, d, x, f, s, ac ) { return bit_rol (a + f (b, c, d) + x + ac, S [s]) + b }

		var S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21]
		var a = CTX.State [0]
		var b = CTX.State [1]
		var c = CTX.State [2]
		var d = CTX.State [3]
		var x = CTX.Buffer

		a = FF (a, b, c, d, x [ 0], F, 0, 0xd76aa478)
		d = FF (d, a, b, c, x [ 1], F, 1, 0xe8c7b756)
		c = FF (c, d, a, b, x [ 2], F, 2, 0x242070db)
		b = FF (b, c, d, a, x [ 3], F, 3, 0xc1bdceee)
		a = FF (a, b, c, d, x [ 4], F, 0, 0xf57c0faf)
		d = FF (d, a, b, c, x [ 5], F, 1, 0x4787c62a)
		c = FF (c, d, a, b, x [ 6], F, 2, 0xa8304613)
		b = FF (b, c, d, a, x [ 7], F, 3, 0xfd469501)
		a = FF (a, b, c, d, x [ 8], F, 0, 0x698098d8)
		d = FF (d, a, b, c, x [ 9], F, 1, 0x8b44f7af)
		c = FF (c, d, a, b, x [10], F, 2, 0xffff5bb1)
		b = FF (b, c, d, a, x [11], F, 3, 0x895cd7be)
		a = FF (a, b, c, d, x [12], F, 0, 0x6b901122)
		d = FF (d, a, b, c, x [13], F, 1, 0xfd987193)
		c = FF (c, d, a, b, x [14], F, 2, 0xa679438e)
		b = FF (b, c, d, a, x [15], F, 3, 0x49b40821)

		a = FF (a, b, c, d, x [ 1], G, 4, 0xf61e2562)
		d = FF (d, a, b, c, x [ 6], G, 5, 0xc040b340)
		c = FF (c, d, a, b, x [11], G, 6, 0x265e5a51)
		b = FF (b, c, d, a, x [ 0], G, 7, 0xe9b6c7aa)
		a = FF (a, b, c, d, x [ 5], G, 4, 0xd62f105d)
		d = FF (d, a, b, c, x [10], G, 5, 0x02441453)
		c = FF (c, d, a, b, x [15], G, 6, 0xd8a1e681)
		b = FF (b, c, d, a, x [ 4], G, 7, 0xe7d3fbc8)
		a = FF (a, b, c, d, x [ 9], G, 4, 0x21e1cde6)
		d = FF (d, a, b, c, x [14], G, 5, 0xc33707d6)
		c = FF (c, d, a, b, x [ 3], G, 6, 0xf4d50d87)
		b = FF (b, c, d, a, x [ 8], G, 7, 0x455a14ed)
		a = FF (a, b, c, d, x [13], G, 4, 0xa9e3e905)
		d = FF (d, a, b, c, x [ 2], G, 5, 0xfcefa3f8)
		c = FF (c, d, a, b, x [ 7], G, 6, 0x676f02d9)
		b = FF (b, c, d, a, x [12], G, 7, 0x8d2a4c8a)

		a = FF (a, b, c, d, x [ 5], H,  8, 0xfffa3942)
		d = FF (d, a, b, c, x [ 8], H,  9, 0x8771f681)
		c = FF (c, d, a, b, x [11], H, 10, 0x6d9d6122)
		b = FF (b, c, d, a, x [14], H, 11, 0xfde5380c)
		a = FF (a, b, c, d, x [ 1], H,  8, 0xa4beea44)
		d = FF (d, a, b, c, x [ 4], H,  9, 0x4bdecfa9)
		c = FF (c, d, a, b, x [ 7], H, 10, 0xf6bb4b60)
		b = FF (b, c, d, a, x [10], H, 11, 0xbebfbc70)
		a = FF (a, b, c, d, x [13], H,  8, 0x289b7ec6)
		d = FF (d, a, b, c, x [ 0], H,  9, 0xeaa127fa)
		c = FF (c, d, a, b, x [ 3], H, 10, 0xd4ef3085)
		b = FF (b, c, d, a, x [ 6], H, 11, 0x04881d05)
		a = FF (a, b, c, d, x [ 9], H,  8, 0xd9d4d039)
		d = FF (d, a, b, c, x [12], H,  9, 0xe6db99e5)
		c = FF (c, d, a, b, x [15], H, 10, 0x1fa27cf8)
		b = FF (b, c, d, a, x [ 2], H, 11, 0xc4ac5665)

		a = FF (a, b, c, d, x [ 0], I, 12, 0xf4292244)
		d = FF (d, a, b, c, x [ 7], I, 13, 0x432aff97)
		c = FF (c, d, a, b, x [14], I, 14, 0xab9423a7)
		b = FF (b, c, d, a, x [ 5], I, 15, 0xfc93a039)
		a = FF (a, b, c, d, x [12], I, 12, 0x655b59c3)
		d = FF (d, a, b, c, x [ 3], I, 13, 0x8f0ccc92)
		c = FF (c, d, a, b, x [10], I, 14, 0xffeff47d)
		b = FF (b, c, d, a, x [ 1], I, 15, 0x85845dd1)
		a = FF (a, b, c, d, x [ 8], I, 12, 0x6fa87e4f)
		d = FF (d, a, b, c, x [15], I, 13, 0xfe2ce6e0)
		c = FF (c, d, a, b, x [ 6], I, 14, 0xa3014314)
		b = FF (b, c, d, a, x [13], I, 15, 0x4e0811a1)
		a = FF (a, b, c, d, x [ 4], I, 12, 0xf7537e82)
		d = FF (d, a, b, c, x [11], I, 13, 0xbd3af235)
		c = FF (c, d, a, b, x [ 2], I, 14, 0x2ad7d2bb)
		b = FF (b, c, d, a, x [ 9], I, 15, 0xeb86d391)

		CTX.State [0] = sum (CTX.State [0], a)
		CTX.State [1] = sum (CTX.State [1], b)
		CTX.State [2] = sum (CTX.State [2], c)
		CTX.State [3] = sum (CTX.State [3], d)
	}
	function update ( Char ) {
		CTX.Code += Char << ((CTX.index & 3) << 3)
		if ((CTX.index & 3) == 3) {
			CTX.Buffer [CTX.index >> 2] = CTX.Code
			CTX.Code = 0
			if (CTX.index == 63)
				transform ()
		}
		CTX.index++
		CTX.index &= 0x3F
	}
	function sum ( x, y ) {
		var l = (x & 0xFFFF) + (y & 0xFFFF)
		var m = (x >> 16) + (y >> 16) + (l >> 16)
		return (m << 16) | (l & 0xFFFF)
	}
	function hex ( n ) {
		function hex ( n ) { return (n >> 4).toString (16) + (n & 0x0f).toString (16) }
		return hex (n & 0xff) + hex ((n >> 8) & 0xff) + hex ((n >> 16) & 0xff) + hex ((n >> 24) & 0xff)
	}

	var CTX = { index: 0, Code: 0, Buffer: [], State: [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476] }
	for (var i = 0; i < this.length; i++)
		update (this.code (i))
	var index = this.length & 0x3f
	var padLen = (index < 56 ? 56 : 120) - index
	update (0x80)
	while (--padLen)
		update (0)
	update ((this.length <<  3) & 0xff)
	update ((this.length >>  5) & 0xff)
	update ((this.length >> 13) & 0xff)
	update ((this.length >> 21) & 0xff)
	update ((this.length >> 29) & 0xff)
	update (0)
	update (0)
	update (0)
	return hex (CTX.State [0]) + hex (CTX.State [1]) + hex (CTX.State [2]) + hex (CTX.State [3])
}

{(function () {
	var a = []
	var r = "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
	for (var i = 0; i < r.length; i++)
		a [r.charCodeAt (i)] = i + 128
	String.prototype.code = function ( i ) {
		var c = this.charCodeAt (i)
		return c > 0xff ? a [c] || 0 : c
	}
}) ()}
