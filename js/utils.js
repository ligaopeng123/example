/**
 * 初始化缓存区对象
 * @param gl
 */
function initVertexBuffers(gl) {

}


/**
 * 初始化着色器
 * @param gl
 * @param vshader
 * @param fshader
 * @returns {*}
 */
export function initShaders(gl, vshader, fshader) {
    const program = createProgram(gl, vshader, fshader);
    if (!program) {
        console.log('创建WebGLProgram程序失败');
        return false;
    }
    // 方法将定义好的WebGLProgram 对象添加到当前的渲染状态中。
    gl.useProgram(program);
    gl.program = program;

    return true;
}

/**
 * 创建着色器程序 WebGLProgram
 * @param gl
 * @param vshader
 * @param fshader
 * @returns {*}
 */
export function createProgram(gl, vshader, fshader) {
    // 创建着色器对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    if (!vertexShader || !fragmentShader) {
        return null;
    }

    // 创建一个着色器程序对象
    const program = gl.createProgram();
    if (!program) {
        return null;
    }

    // 负责往 着色器程序对象（WebGLProgram） 添加一个片段或者顶点着色器。
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 链接给定的WebGLProgram，从而完成为程序的片元和顶点着色器准备GPU代码的过程。
    gl.linkProgram(program);

    // Check the result of linking
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        const error = gl.getProgramInfoLog(program);
        console.log('链接程序失败: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}

/**
 * 加载着色器
 * @param gl
 * @param type
 * @param source
 * @returns {*}
 */
export function loadShader(gl, type, source) {
    // 创建着色器对象
    const shader = gl.createShader(type);
    if (shader == null) {
        console.log('unable to create shader');
        return null;
    }

    /**
     * 设置着色器程序
     * shader着色器对象
     * source 包含GLSL程序代码的字符串。
     */
    gl.shaderSource(shader, source);

    // 编译一个GLSL着色器，使其成为为二进制数据，然后就可以被WebGLProgram对象所使用.
    gl.compileShader(shader);
    // 返回给定的着色器信息
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        const error = gl.getShaderInfoLog(shader);
        console.log('编译着色器失败: ' + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}