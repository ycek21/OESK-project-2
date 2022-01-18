using System.Threading.Tasks;
using Contracts;
using Entities.models;
using Microsoft.AspNetCore.Mvc;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/historicData")]
    public class HistoricDataController :ControllerBase
    {
        private IRepositoryManager _repository;

        public HistoricDataController(IRepositoryManager repository)
        {
            _repository=repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHistoricData()
        {
            var historicData=_repository.HistoricData.GetAllHistoricDataAsync(false);
            return Ok(historicData.Result);
        }
        [HttpPost]
         public async Task<IActionResult> PostData([FromBody] HistoricData data)
         {
                if (data == null)
            {
                return BadRequest("Data object is null");
            }
             if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }
            try {
                _repository.HistoricData.Create(data);
                await _repository.SaveAsync();
                return StatusCode(201);

            }catch (System.Exception)
            {
                  BadRequest(new { message = "Something went wrong" });
            }

            return StatusCode(201, data);
         }
    }
}