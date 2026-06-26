PhysicsEngine.prototype.SolveKepler = function(
    M, 
    e, 
    tolerance = 1e-6
) 
{
    let E = e < 0.8 ? M : Math.PI;
    let delta, maxIter = 100, iter = 0;
    do 
    {
        delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        E -= delta;
    } 
    while (Math.abs(delta) > tolerance && ++iter < maxIter);
    return E;  
}