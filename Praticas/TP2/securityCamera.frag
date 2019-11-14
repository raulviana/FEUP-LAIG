#ifdef GL_ES
precision highp float;
#endif


uniform sampler2D uSampler;

varying vec2 vTextureCoord;



void main() {

	
	

	vec2 st = vTextureCoord.xy;
	float ptc = 0.0;
	ptc = distance(st, vec2(0.5, 0.5));
	vec4 filter = vec4(ptc, ptc, ptc, 1.0);
	
	vec4 texture = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = texture * filter;

	

	
	
}

