using System.Threading.Tasks;
using Contracts;
using Entities.models;
using Microsoft.AspNetCore.Mvc;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/historicData")]
    public class HistoricDataController : ControllerBase
    {
        private IRepositoryManager _repository;

        public HistoricDataController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHistoricData()
        {
            var historicData = await _repository.HistoricData.GetAllHistoricDataAsync(false);
            return Ok(historicData);
        }
        [HttpGet("small")]
        public async Task<IActionResult> GetSmallQualityHistoricData()
        {
            var historicData = await _repository.HistoricData.GetSmallQualityHistoricDataAsync(false);
            return Ok(historicData);
        }
        [HttpGet("medium")]
        public async Task<IActionResult> GetMediumQualityHistoricData()
        {
            var historicData = await _repository.HistoricData.GetMediumQualityHistoricDataAsync(false);
            return Ok(historicData);
        }
        [HttpGet("large")]
        public async Task<IActionResult> GetLargeQualityHistoricData()
        {
            var historicData = await _repository.HistoricData.GetLargeQualityHistoricDataAsync(false);
            return Ok(historicData);
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
            try
            {
                _repository.HistoricData.Create(data);
                await _repository.SaveAsync();
                // return StatusCode(201);
                return Ok();

            }
            catch (System.Exception)
            {
                return BadRequest(new { message = "Something went wrong" });
            }

        }
    }
}