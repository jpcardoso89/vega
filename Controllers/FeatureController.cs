using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Persistence;

namespace vega.Controllers
{
    [Route("/api/features")]
    public class FeatureController
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public FeatureController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures(){
            var feature =  await context.Feature.ToListAsync();
            return mapper.Map<List<Feature>,List<KeyValuePairResource>>(feature);
        }
    }
}