#ifdef GL_ES
precision highp float;
#endif


uniform sampler2D uSampler;
uniform float timeFactor;
varying vec2 vTextureCoord;



void main() {
	vec3 line = vec3(0.6, 0.6, 0.6);
	vec2 coords = vTextureCoord.xy;
	vec2 st = vTextureCoord.xy;
	float ptc = 0.0;
	float number_lines = 12.0;          // number_lines represents the number of lines on screen, but the relation isn't linear
	float y_size = 14.0;                //y_size varies inversely with the size of the line on screen
	float speed = 4.0;


	ptc = distance(st, vec2(0.5, 0.5));    

	vec4 filterGradient = vec4(abs(0.85 - ptc), abs(0.85 - ptc), abs(0.85 - ptc), 1.0);  //0.65 max color in the center, so it doesn't get to white/brigth in the center of the screen
	
	vec4 texture = texture2D(uSampler, vTextureCoord);

	float alpha = abs(sin((coords.y * number_lines) - timeFactor * speed) * y_size);

	gl_FragColor =  texture * filterGradient * vec4(line, alpha);

	
	
		
}

