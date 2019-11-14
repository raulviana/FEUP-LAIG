#ifdef GL_ES
precision highp float;
#endif


uniform sampler2D uSampler;

varying vec2 vTextureCoord;



void main() {

	
	

	vec2 st = vTextureCoord.xy;
	float ptc = 0.0;
	ptc = log(1.0/distance(st, vec2(0.5, 0.5))*0.8);       //*0.8 aumenta ou diminui o raio até à borda preta
	if(ptc >= 3.0){    //condição para mitigar o centro mais luminoso que este método cria
		ptc = 3.0;
	}
	
	vec4 filter = vec4(ptc*0.3, ptc*0.3, ptc*0.3, 1.0); //*0.3 serve para baixar os valores que  vão ser multiplicados pelas cores da textura e assim torná-la um pouco mais escura
	
	vec4 texture = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = texture * filter;

	

	
	
}

