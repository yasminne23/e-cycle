//	============================================================
//	E-CYCLE	-	Servidor	da	API	(Node.js	+	Express)
//	Ponto	de	entrada:	monta	middlewares	e	rotas.
//	============================================================
require('dotenv').config();
const	express	=	require('express');
const	cors	=	require('cors');
const	{	tratarErro,	naoEncontrado	}	=	require('./middlewares/erro');
const	{	autenticar	}	=	require('./middlewares/auth');
//	Rotas
const	authRoutes	=	require('./routes/auth.routes');
const	perfilRoutes	=	require('./routes/perfil.routes');
const	usuariosRoutes	=	require('./routes/usuarios.routes');
const	empresasRoutes	=	require('./routes/empresas.routes');
const	tiposRoutes	=	require('./routes/tipos.routes');
const	pontosRoutes	=	require('./routes/pontos.routes');
const	entregasRoutes	=	require('./routes/entregas.routes');
const	relatoriosRoutes	=	require('./routes/relatorios.routes');
const	app	=	express();
const	PORT	=	process.env.PORT	||	3000;
//	---	Middlewares	globais	--
app.use(cors());												
//	libera	o	acesso	do	frontend
app.use(express.json());				
//	interpreta	o	corpo	JSON	das	requisicoes
//	---	Rota	de	saude	(publica)	--
app.get('/',	(req,	res)	=>	{
res.json({	app:	'E-Cycle	API',	status:	'ok',	versao:	'2.0.0'	});
});
//	---	Rotas	PUBLICAS	(cadastro	e	login)	--
app.use('/api/auth',	authRoutes);
//	---	A	partir	daqui,	tudo	exige	token	(usuario	logado)	--
app.use('/api',	autenticar);
//	---	Rotas	protegidas	--
app.use('/api/perfil',	perfilRoutes);								
app.use('/api/usuarios',	usuariosRoutes);				
app.use('/api/empresas',	empresasRoutes);				
app.use('/api/tipos',	tiposRoutes);										
app.use('/api/pontos',	pontosRoutes);								
app.use('/api/entregas',	entregasRoutes);				
//	qualquer	logado	(dados	proprios)
//	admin
//	admin
//	listar:	logado	|	gestao:	admin
//	listar:	logado	|	gestao:	admin
//	registrar:	logado	|	historico:	admin
app.use('/api/relatorios',	relatoriosRoutes);//	admin
//	---	Rotas	inexistentes	e	tratamento	de	erros	--
app.use(naoEncontrado);
app.use(tratarErro);
app.listen(PORT,	()	=>	{
console.log(`E-Cycle	API	rodando	em	http://localhost:${PORT}`);
});