#ifdef GL_ES
precision highp float;
#endif


uniform sampler2D uSampler;
uniform float timeFactor;
varying vec2 vTextureCoord;



void main() {
	vec3 line = vec3(1.0);
	vec2 coords = vTextureCoord.xy;
	vec2 st = vTextureCoord.xy;
	float ptc = 0.0;
	float size = 6.0;
	ptc = distance(st, vec2(0.5, 0.5));    

	vec4 filterGradient = vec4(abs(0.65 - ptc), abs(0.65 - ptc), abs(0.65 - ptc), 1.0); 
	vec4 texture = texture2D(uSampler, vTextureCoord);

//	gl_FragColor = texture * filterGradient;
	
	
	float alpha = sin(timeFactor * 8.0);
		
	gl_FragColor = vec4(line, alpha);

}

