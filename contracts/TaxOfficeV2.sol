// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./owner/Operator.sol";
import "./interfaces/ITaxable.sol";
import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IERC20.sol";

contract TaxOfficeV2 is Operator {
    using SafeMath for uint256;

    address public gun = address(0x522348779DCb2911539e76A1042aA922F9C47Ee3);
    address public weth = address(0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c);
    address public uniRouter = address(0x10ED43C718714eb63d5aA57B78B54704E256024E);

    mapping(address => bool) public taxExclusionEnabled;

    function setTaxTiersTwap(uint8 _index, uint256 _value) public onlyOperator returns (bool) {
        return ITaxable(gun).setTaxTiersTwap(_index, _value);
    }

    function setTaxTiersRate(uint8 _index, uint256 _value) public onlyOperator returns (bool) {
        return ITaxable(gun).setTaxTiersRate(_index, _value);
    }

    function enableAutoCalculateTax() public onlyOperator {
        ITaxable(gun).enableAutoCalculateTax();
    }

    function disableAutoCalculateTax() public onlyOperator {
        ITaxable(gun).disableAutoCalculateTax();
    }

    function setTaxRate(uint256 _taxRate) public onlyOperator {
        ITaxable(gun).setTaxRate(_taxRate);
    }

    function setBurnThreshold(uint256 _burnThreshold) public onlyOperator {
        ITaxable(gun).setBurnThreshold(_burnThreshold);
    }

    function setTaxCollectorAddress(address _taxCollectorAddress) public onlyOperator {
        ITaxable(gun).setTaxCollectorAddress(_taxCollectorAddress);
    }

    function excludeAddressFromTax(address _address) external onlyOperator returns (bool) {
        return _excludeAddressFromTax(_address);
    }

    function _excludeAddressFromTax(address _address) private returns (bool) {
        if (!ITaxable(gun).isAddressExcluded(_address)) {
            return ITaxable(gun).excludeAddress(_address);
        }
    }

    function includeAddressInTax(address _address) external onlyOperator returns (bool) {
        return _includeAddressInTax(_address);
    }

    function _includeAddressInTax(address _address) private returns (bool) {
        if (ITaxable(gun).isAddressExcluded(_address)) {
            return ITaxable(gun).includeAddress(_address);
        }
    }

    function taxRate() external returns (uint256) {
        return ITaxable(gun).taxRate();
    }

    function addLiquidityTaxFree(
        address token,
        uint256 amtGun,
        uint256 amtToken,
        uint256 amtGunMin,
        uint256 amtTokenMin
    )
        external
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        require(amtGun != 0 && amtToken != 0, "amounts can't be 0");
        _excludeAddressFromTax(msg.sender);

        IERC20(gun).transferFrom(msg.sender, address(this), amtGun);
        IERC20(token).transferFrom(msg.sender, address(this), amtToken);
        _approveTokenIfNeeded(gun, uniRouter);
        _approveTokenIfNeeded(token, uniRouter);

        _includeAddressInTax(msg.sender);

        uint256 resultAmtGun;
        uint256 resultAmtToken;
        uint256 liquidity;
        (resultAmtGun, resultAmtToken, liquidity) = IUniswapV2Router(uniRouter).addLiquidity(
            gun,
            token,
            amtGun,
            amtToken,
            amtGunMin,
            amtTokenMin,
            msg.sender,
            block.timestamp
        );

        if (amtGun.sub(resultAmtGun) > 0) {
            IERC20(gun).transfer(msg.sender, amtGun.sub(resultAmtGun));
        }
        if (amtToken.sub(resultAmtToken) > 0) {
            IERC20(token).transfer(msg.sender, amtToken.sub(resultAmtToken));
        }
        return (resultAmtGun, resultAmtToken, liquidity);
    }

    function addLiquidityETHTaxFree(
        uint256 amtGun,
        uint256 amtGunMin,
        uint256 amtEthMin
    )
        external
        payable
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        require(amtGun != 0 && msg.value != 0, "amounts can't be 0");
        _excludeAddressFromTax(msg.sender);

        IERC20(gun).transferFrom(msg.sender, address(this), amtGun);
        _approveTokenIfNeeded(gun, uniRouter);

        _includeAddressInTax(msg.sender);

        uint256 resultAmtGun;
        uint256 resultAmtEth;
        uint256 liquidity;
        (resultAmtGun, resultAmtEth, liquidity) = IUniswapV2Router(uniRouter).addLiquidityETH{value: msg.value}(
            gun,
            amtGun,
            amtGunMin,
            amtEthMin,
            msg.sender,
            block.timestamp
        );

        if (amtGun.sub(resultAmtGun) > 0) {
            IERC20(gun).transfer(msg.sender, amtGun.sub(resultAmtGun));
        }
        return (resultAmtGun, resultAmtEth, liquidity);
    }

    function setTaxableGunOracle(address _gunOracle) external onlyOperator {
        ITaxable(gun).setGunOracle(_gunOracle);
    }

    function transferTaxOffice(address _newTaxOffice) external onlyOperator {
        ITaxable(gun).setTaxOffice(_newTaxOffice);
    }

    function taxFreeTransferFrom(
        address _sender,
        address _recipient,
        uint256 _amt
    ) external {
        require(taxExclusionEnabled[msg.sender], "Address not approved for tax free transfers");
        _excludeAddressFromTax(_sender);
        IERC20(gun).transferFrom(_sender, _recipient, _amt);
        _includeAddressInTax(_sender);
    }

    function setTaxExclusionForAddress(address _address, bool _excluded) external onlyOperator {
        taxExclusionEnabled[_address] = _excluded;
    }

    function _approveTokenIfNeeded(address _token, address _router) private {
        if (IERC20(_token).allowance(address(this), _router) == 0) {
            IERC20(_token).approve(_router, type(uint256).max);
        }
    }
}